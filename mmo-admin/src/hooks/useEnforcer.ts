import { Enforcer, Model, newEnforcer } from 'casbin-core'
import { Permission } from 'features/authorization/types'
import { useEffect, useState } from 'react'
import storage from 'utils/storage'

const asyncSome = async <T>(
  array: T[],
  callback: (value: T, index: number, a: T[]) => Promise<boolean>
): Promise<boolean> => {
  for (let i = 0; i < array.length; i++) {
    const result = await callback(array[i], i, array)
    if (result) {
      return result
    }
  }
  return false
}

const asyncEvery = async <T>(
  array: T[],
  callback: (value: T, index: number, a: T[]) => Promise<boolean>
): Promise<boolean> => {
  for (let i = 0; i < array.length; i++) {
    const result = await callback(array[i], i, array)
    if (!result) {
      return result
    }
  }
  return true
}

const hasPermission = async (
  enforcer: Enforcer,
  username: string,
  permission: Permission
): Promise<boolean> => {
  const { resource, action } = permission

  // const poss = []

  // if (possession === AuthPossession.OWN_ANY) {
  //   poss.push(AuthPossession.ANY, AuthPossession.OWN)
  // } else {
  //   poss.push(possession)
  // }

  const enforce = await enforcer.enforce(username, resource, action)
  return enforce

  // return asyncSome<AuthPossession>(poss, async (p) => {
  //   if (p === AuthPossession.OWN) {
  //     // return (permission as any).isOwn(context);
  //     return true
  //   } else {
  //     return enforcer.enforce(username, resource, `${action}:${p}`)
  //   }
  // })
}

export const canAccess = async (
  enforcer: Enforcer,
  username: string,
  permissions?: Permission[] | undefined
): Promise<boolean> => {
  if (!permissions) {
    return true
  }

  if (!username) {
    return false
  }

  const result = await asyncEvery<Permission>(permissions, async (permission) =>
    hasPermission(enforcer, username, permission)
  )

  return result
}

const model = new Model(`
			[request_definition]
			r = sub, obj, act

			[policy_definition]
			p = sub, obj, act

			[role_definition]
			g = _, _

			[policy_effect]
			e = some(where (p.eft == allow))

			[matchers]
			m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
		`)

export const useEnforcer = (username: string) => {
  const [enforcer, setEnforcer] = useState<Enforcer>()

  useEffect(() => {
    newEnforcer(model)
      .then((e) => {
        const permissions = storage.getPermissions()
        permissions.forEach((permission: any) => {
          e.addPolicy(username, permission[1], permission[2])
        })
        setEnforcer(e)
      })
      .catch((err) => {
        console.log('error.................', err)
      })
  }, [username])

  return enforcer
}
