const graphql = require('graphql')
const path = require('path')
const pokemonModel = require(path.join(__dirname, '..', 'mongo', 'models', 'pokemon.js'))

const pokemonType = new graphql.GraphQLObjectType({
  name: 'Pokemon',
  fields: {
    _id: {type: graphql.GraphQLString},
    abilities: {type: graphql.GraphQLList(graphql.GraphQLString)},
    detailPageURL: {type: graphql.GraphQLString},
    weight: {type: graphql.GraphQLInt},
    weakness: {type: graphql.GraphQLList(graphql.GraphQLString)},
    number: {type: graphql.GraphQLString},
    height: {type: graphql.GraphQLInt},
    collectibles_slug: {type: graphql.GraphQLString},
    featured: {type: graphql.GraphQLBoolean},
    slug: {type: graphql.GraphQLString},
    name: {type: graphql.GraphQLString},
    ThumbnailAltText: {type: graphql.GraphQLString},
    ThumbnailImage: {type: graphql.GraphQLString},
    type: {type: graphql.GraphQLList(graphql.GraphQLString)}
  }
})

const allPokemonsQuery = queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    allPokemons: {
      type: graphql.GraphQLList(pokemonType),
      resolve: () => {
        return pokemonModel.find()
      }
    }
  }
})

const pokemonQuery = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    pokemon: {
      type: pokemonType,
      args: {
        filter: { type: graphql.GraphQLObjectType }
      },
      resolve: (_, {filter}) => {
        return pokemonModel.find(filter)
      }
    }
  }
})

const schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      allPokemonsQuery,
      pokemonQuery,
    },
  })
})

module.exports = schema
