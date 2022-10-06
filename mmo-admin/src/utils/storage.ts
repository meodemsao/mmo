const storagePrefix = 'bulletproof_react_'

const storage = {
  getToken: () => {
    return window.localStorage.getItem(`${storagePrefix}token`) as string
  },
  getRefreshToken: () => {
    return window.localStorage.getItem(`${storagePrefix}refresh-token`) as string
  },
  setToken: (token: string) => {
    console.log('setToken: ..................', token)
    window.localStorage.setItem(`${storagePrefix}token`, token)
  },
  setRefreshToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}refresh-token`, token)
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`)
    window.localStorage.removeItem(`${storagePrefix}refresh-token`)
  },
  getPermissions: () => {
    const permissionsStorage = window.localStorage.getItem(`${storagePrefix}permissions`) as string
    return JSON.parse(permissionsStorage)
  },
  setPermissions: (permissions: string[][]) => {
    window.localStorage.setItem(`${storagePrefix}permissions`, JSON.stringify(permissions))
  },
  clearPermissions: () => {
    window.localStorage.removeItem(`${storagePrefix}permissions`)
  },
}

export default storage
