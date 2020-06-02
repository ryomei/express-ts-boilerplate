import { GraphQLObjectType } from 'graphql'

import userMutations from './login'

const mutations = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    user: userMutations.createUser
  }
})

export default mutations
