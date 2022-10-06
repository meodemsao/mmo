import { ObjectType } from '@nestjs/graphql'
import PaginatedResponse from 'src/common/pagination/pagination'
// import { Post } from './post.model';
import { Post } from '../../@generated/post/post.model'

@ObjectType()
export class PostConnection extends PaginatedResponse(Post) {}
