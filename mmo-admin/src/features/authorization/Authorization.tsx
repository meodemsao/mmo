import { useEffect, useState } from 'react'
import { useEnforcer, canAccess } from 'hooks/useEnforcer'
import { Permission } from './types'
import { useAuth } from 'lib/auth'

interface AuthorizationProps {
  permission: Permission[] | undefined
  forbiddenFallback: React.ReactNode
  children: React.ReactNode
}

const Authorization = (props: AuthorizationProps) => {
  const { permission, forbiddenFallback, children } = props

  const [result, setResult] = useState(false)
  const { user } = useAuth()

  const enforcer = useEnforcer(user?.username as string)

  useEffect(() => {
    if (enforcer) {
      const getCanAcess = async () => {
        setResult(await canAccess(enforcer, user?.username as string, permission))
      }
      getCanAcess()
    }
  }, [permission, enforcer])

  return <>{result === true ? children : forbiddenFallback}</>
}

export default Authorization
