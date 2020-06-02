import { GraphQLString } from 'graphql'

const helloWorld = {
  type: GraphQLString,
  resolve () {
    return 'World!'
  }
}

export default helloWorld
