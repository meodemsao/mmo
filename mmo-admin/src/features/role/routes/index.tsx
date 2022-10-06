import { lazyImport } from 'utils/lazyImport'

const { Roles } = lazyImport(() => import('./Roles'), 'Roles')
const { RoleCreate } = lazyImport(() => import('./RoleCreate'), 'RoleCreate')
const { RoleEdit } = lazyImport(() => import('./RoleEdit'), 'RoleEdit')
const { GrantPermission } = lazyImport(() => import('./GrantPermission'), 'GrantPermission')

export const RoleRoutes = [
  { path: '/roles/grant/:roleName', element: <GrantPermission /> },
  { path: '/roles/edit/:id', element: <RoleEdit /> },
  { path: '/roles/create', element: <RoleCreate /> },
  { path: '/roles', element: <Roles /> },
]
