const graphql = require('graphql')
const path = require('path')
const pokemonType = require(path.join(__dirname, '..', 'types', 'pokemonType.js'))

module.exports = new graphql.GraphQLObjectType({
  pokemons: [pokemonType],
})
