import { ObjectType } from '@nestjs/graphql';
// import { User } from 'src/users/models/user.model';
import { User } from '../../@generated/user/user.model';
import { Token } from './token.model';

@ObjectType()
export class Auth extends Token {
  user: User;
}
