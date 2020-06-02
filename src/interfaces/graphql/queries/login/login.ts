import { GraphQLString, GraphQLInputObjectType, GraphQLObjectType } from 'graphql'
import authAppplication from './../../../../application/auth'

const LoginInputType = new GraphQLInputObjectType({
  name: 'LoginInput',
  fields: {
    username: { type: GraphQLString! },
    password: { type: GraphQLString! }
  }
})

const TokenType = new GraphQLObjectType({
  name: 'Token',
  fields: {
    token: { type: GraphQLString }
  }
})

const login = {
  type: TokenType,
  args: { login: { type: LoginInputType! } },
  resolve (value: any, { login }: any) {
    const appResult = authAppplication.login(login.username, login.password)
    return appResult
  }
}

export default login
