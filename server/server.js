const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const mongo = require(path.join(__dirname, 'bundles', 'mongo', 'mongo.js'))

const pokemonSchema = require(path.join(__dirname, 'bundles', 'graphql', 'pokemon.js'))

mongo.connect()

const app = express()

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: pokemonSchema }))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(8080, () => {
  console.log('Go to http://localhost:9000/graphiql to run queries!')
})
