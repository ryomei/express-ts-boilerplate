import { GraphQLObjectType, GraphQLString } from 'graphql'
import markField from './grettings/mark'
import helloField from './grettings/world'
import loginQueries from './login'

// Bad examples to show some behaviour that would be tricky
// to debug: 'My query is not working as expected!'
const badExample = {
  overwrittenKey: {
    type: GraphQLString,
    resolve () {
      return 'Original content'
    }
  }
}

const badExample2 = {
  overwrittenKey: {
    type: GraphQLString,
    resolve () {
      return 'Original content is unreacheable =('
    }
  }
}

const queries = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...badExample,
    ...badExample2,
    hello: helloField,
    hi: markField,
    login: loginQueries.login
  }
})

export default queries
