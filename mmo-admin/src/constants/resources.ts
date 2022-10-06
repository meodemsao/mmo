import _ from 'lodash'

export const Resources = [
  'user',
  'role',
  'category',
  'product',
  'order',
  'order_item',
  'license',
  'plan',
  'subscription',
]

export const AuthActionVerb = ['create', 'read', 'update', 'delete']

export const allPermissions = () => {
  const resourcesSorted = _.sortBy(Resources)

  const result = resourcesSorted.map((resource) => {
    return AuthActionVerb.map((action) => {
      return [resource, action]
    })
  })

  return _.flatten(result)
}
