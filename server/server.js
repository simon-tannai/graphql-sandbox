const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const mongo = require(path.join(__dirname, 'bundles', 'mongo', 'mongo.js'))
const pokemon = require(path.join(__dirname, 'bundles', 'mongo', 'models', 'pokemon.js'))

mongo.connect()

// The GraphQL schema in string form
const typeDefs = `
  type Query { pokemons: [Pokemon] }
  type Pokemon {
    _id: String
    abilities: [String],
    detailPageURL: String,
    weight: Int,
    weakness: [String],
    number: String,
    height: Int,
    collectibles_slug: String,
    featured: Boolean,
    slug: String,
    name: String,
    ThumbnailAltText: String,
    ThumbnailImage: String,
    type: [String],
  }
`

// The resolvers
const resolvers = {
  Query: { pokemons: async () => {
    return pokemon.find()
  } },
}

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const app = express()

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(8080, () => {
  console.log('Go to http://localhost:8080/graphiql to run queries!')
})
