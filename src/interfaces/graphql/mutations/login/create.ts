import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql'
import loginApplication from './../../../../application/login'

const User = new GraphQLObjectType(
  {
    name: 'User',
    fields: {
      username: { type: GraphQLString! }
    }
  }
)

const UserInputType = new GraphQLInputObjectType(
  {
    name: 'UserInput',
    fields: {
      username: { type: GraphQLString },
      password: { type: GraphQLString }
    }
  }
)

const createUser = {
  type: User,
  args: { user: { type: UserInputType } },
  resolve (value: any, { user }: any) {
    return loginApplication.create(user.username, user.password)
  }
}

export default createUser
