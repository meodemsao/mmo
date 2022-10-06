export enum Resource {
  USER = 'user',
  ROLE = 'role',
  CATEGORY = 'category',
  PRODUCT = 'product',
  ORDER = 'order',
  ORDER_ITEM = 'order_item',
  KEY = 'key',
  USERS_LIST = 'users_list',
  USER_ROLES = 'user_roles',
  USER_PERMISSIONS = 'user_permissions',
  ROLES_LIST = 'roles_list',
  ROLE_PERMISSIONS = 'role_permission',
}

export interface ResourceMeta {
  name: Resource
  displayName?: string
  description?: string
  isGroup: boolean
  children?: ResourceMeta[]
}

export const Resources: ResourceMeta[] = [
  {
    name: Resource.USER,
    displayName: 'User',
    isGroup: true,
    children: [
      {
        name: Resource.USERS_LIST,
        displayName: 'Users List',
        description: 'Users list',
        isGroup: false,
      },
      {
        name: Resource.USER_ROLES,
        displayName: 'User Roles',
        description: 'Roles owned by user',
        isGroup: false,
      },
      {
        name: Resource.USER_PERMISSIONS,
        displayName: 'User Permissions',
        description: 'Permissions owned by user',
        isGroup: false,
      },
    ],
  },
  {
    name: Resource.ROLE,
    displayName: 'Role',
    isGroup: true,
    children: [
      {
        name: Resource.ROLES_LIST,
        displayName: 'Roles List',
        description: 'Roles List',
        isGroup: false,
      },
      {
        name: Resource.ROLE_PERMISSIONS,
        displayName: 'Role Permission',
        description: 'Role Permission',
        isGroup: false,
      },
    ],
  },
]
