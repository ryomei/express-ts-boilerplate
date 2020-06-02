import { GraphQLSchema } from 'graphql'

import queries from './queries/all-queries'
import mutations from './mutations/all-mutations'

const schema = new GraphQLSchema(
  {
    query: queries,
    mutation: mutations
  }
)

export default schema
