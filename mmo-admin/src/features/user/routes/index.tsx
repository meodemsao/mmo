import { Navigate, Route, Routes } from 'react-router-dom'
import { lazyImport } from 'utils/lazyImport'

const { AssignRole } = lazyImport(() => import('./AssignRole'), 'AssignRole')
const { Users } = lazyImport(() => import('./Users'), 'Users')

export const UsersRoutes = [
  { path: '/users/assign/:username', element: <AssignRole /> },
  { path: '/users', element: <Users /> },
]
