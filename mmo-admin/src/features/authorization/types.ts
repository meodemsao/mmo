import { AuthActionVerb, AuthPossession, CustomAuthActionVerb } from 'constants/enum/auth'

export interface Permission {
  resource: string
  action: AuthActionVerb | CustomAuthActionVerb
  // possession: AuthPossession
}
