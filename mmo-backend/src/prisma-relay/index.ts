import graphqlFields from 'graphql-fields';
import {
  Connection,
  // ConnectionArguments,
  Edge,
  Options,
  PrismaFindManyArguments,
} from './interfaces';

export * from './interfaces';

export async function findManyCursorConnection<
  Record = { id: string },
  Cursor = { id: string },
  Node = Record,
  CustomEdge extends Edge<Node> = Edge<Node>
>(
  findMany: (args: PrismaFindManyArguments<Cursor>) => Promise<Record[]>,
  aggregate: () => Promise<number>,
  args: PrismaFindManyArguments<Cursor> = {},
  pOptions?: Options<Record, Cursor, Node, CustomEdge>
): Promise<Connection<Node, CustomEdge>> {
  // Make sure the connection arguments are valid and throw an error otherwise
  // istanbul ignore next
  //   if (!validateArgs(args)) {
  //     throw new Error(
  //       'This code path can never happen, only here for type safety'
  //     );
  //   }

  const options = mergeDefaultOptions(pOptions);
  const requestedFields =
    options.resolveInfo && Object.keys(graphqlFields(options.resolveInfo));
  const hasRequestedField = (key: string) =>
    !requestedFields || requestedFields.includes(key);

  let records: Array<Record>;
  let hasNextPage: boolean;
  let hasPreviousPage: boolean;

  if (args.take && args.take > 0) {
    const take = args.take + 1;

    args = {
      ...args,
      take: take,
    };

    records =
      hasRequestedField('edges') || hasRequestedField('nodes')
        ? await findMany(args)
        : [];

    hasPreviousPage = args.skip > 0;

    const copy = [...records]; // avoid mutations on original array
    hasNextPage = copy.length === take;

    if (hasNextPage) {
      records.pop();
    }
  } else if (args.take && args.take < 0) {
    const take = args.take - 1;
    args = {
      ...args,
      take: take,
    };

    records =
      hasRequestedField('edges') || hasRequestedField('nodes')
        ? await findMany(args)
        : [];

    const copy = [...records];
    hasPreviousPage = copy.length === -take;

    hasNextPage = args.skip > 0;

    if (hasPreviousPage) {
      records.shift();
    }
  } else {
    records =
      hasRequestedField('edges') || hasRequestedField('nodes')
        ? await findMany(args)
        : [];

    hasNextPage = false;
    hasPreviousPage = false;
  }

  const totalCount = hasRequestedField('totalCount') ? await aggregate() : -1;

  // The cursors are always the first & last elements of the result set
  const startCursor =
    records.length > 0 ? encodeCursor(records[0], options) : undefined;
  const endCursor =
    records.length > 0
      ? encodeCursor(records[records.length - 1], options)
      : undefined;

  const edges = records.map((record) => {
    return {
      ...options.recordToEdge(record),
      cursor: encodeCursor(record, options),
    } as CustomEdge;
  });

  return {
    edges,
    nodes: edges.map((edge) => edge.node),
    pageInfo: { hasNextPage, hasPreviousPage, startCursor, endCursor },
    totalCount: totalCount,
  };
}

type MergedOptions<
  Record,
  Cursor,
  Node,
  CustomEdge extends Edge<Node>
> = Required<Options<Record, Cursor, Node, CustomEdge>>;

function mergeDefaultOptions<
  Record,
  Cursor,
  Node,
  CustomEdge extends Edge<Node>
>(
  pOptions?: Options<Record, Cursor, Node, CustomEdge>
): MergedOptions<Record, Cursor, Node, CustomEdge> {
  return {
    getCursor: (record: Record) =>
      ({ id: (record as unknown as { id: string }).id } as unknown as Cursor),
    encodeCursor: (cursor: Cursor) => (cursor as unknown as { id: string }).id,
    decodeCursor: (cursorString: string) =>
      ({ id: cursorString } as unknown as Cursor),
    recordToEdge: (record: Record) =>
      ({ node: record } as unknown as Omit<CustomEdge, 'cursor'>),
    resolveInfo: null,
    ...pOptions,
  };
}

function encodeCursor<Record, Cursor, Node, CustomEdge extends Edge<Node>>(
  record: Record,
  options: MergedOptions<Record, Cursor, Node, CustomEdge>
): string {
  return options.encodeCursor(options.getCursor(record));
}
