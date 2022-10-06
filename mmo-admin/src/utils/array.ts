import _ from 'lodash'
import path from 'path'

export const checkExistsArray = (arr: [][], search: []) => {
  return arr.some((row: []) => _.isEqual(row, search))
}

export const dropSubPermission = (permissions: string[][] | undefined) => {
  if (permissions) {
    return permissions.map((item) => _.drop(item))
  }
  return undefined
}

export const mergePermissionArray = (permissions: [][], rolePermissions: [][]) => {
  let result: any[] = []

  permissions.forEach((permission: []) => {
    let resultPemission
    if (checkExistsArray(rolePermissions, permission)) {
      resultPemission = [...permission, true]
    } else {
      resultPemission = [...permission, false]
    }
    result.push(resultPemission)
  })

  return result
}
