// import { AddIcon } from '@chakra-ui/icons'
import { PlusIcon } from '@heroicons/react/24/solid'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
type SideNavigationItem = {
  name: string
  to: string
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}

export const SideNavigation = () => {
  // const { checkAccess } = useAuthorization();
  const navigation = [
    { name: 'Dashboard', to: '.', icon: PlusIcon },
    { name: 'Plan', to: './plans', icon: PlusIcon },
    { name: 'Subcription', to: './subs', icon: PlusIcon },
    { name: 'Users', to: './users', icon: PlusIcon },
    { name: 'Roles', to: './roles', icon: PlusIcon },
    // checkAccess({ allowedRoles: [ROLES.ADMIN] }) && {
    //   name: 'Users',
    //   to: './users',
    //   icon: UsersIcon,
    // },
  ].filter(Boolean) as SideNavigationItem[]

  return (
    <>
      {navigation.map((item, index) => (
        <NavLink
          end={index === 0}
          key={item.name}
          to={item.to}
          className={clsx(
            'text-gray-300 hover:bg-gray-700 hover:text-white',
            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
          )}
        >
          <item.icon
            className={clsx(
              'text-gray-400 group-hover:text-gray-300',
              'mr-4 flex-shrink-0 h-6 w-6'
            )}
            aria-hidden="true"
          />
          {item.name}
        </NavLink>
      ))}
    </>
  )
}
