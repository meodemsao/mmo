import { InputType, Field, registerEnumType } from '@nestjs/graphql'
import { AuthActionVerb } from 'nest-authz'
import { Resource } from '../resources'

registerEnumType(AuthActionVerb, {
  name: 'AuthActionVerb',
  description: 'Auth actions.',
})

registerEnumType(Resource, {
  name: 'Resource',
  description: 'Resource.',
})

@InputType()
export class PermissionInput {
  @Field(() => String)
  operation: string

  @Field(() => String)
  object: string
}
