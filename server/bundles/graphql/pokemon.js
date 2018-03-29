const graphql = require('graphql')
const path = require('path')
const pokemonModel = require(path.join(__dirname, '..', 'mongo', 'models', 'pokemon.js'))

const floatType = new graphql.GraphQLScalarType({
  name: 'FloatType',
  serialize: (value) => {
    if (parseFloat(value) && !isNaN(parseFloat(value))) {
      return value
    }

    return null
  },
})

const pokemonType = new graphql.GraphQLObjectType({
  name: 'Pokemon',
  fields: {
    _id: {type: graphql.GraphQLString},
    abilities: {type: graphql.GraphQLList(graphql.GraphQLString)},
    detailPageURL: {type: graphql.GraphQLString},
    weight: {type: graphql.GraphQLFloat},
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

const schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      allPokemons: {
        type: graphql.GraphQLList(pokemonType),
        resolve: () => {
          return pokemonModel.find()
        }
      },
      pokemonByName: {
        type: pokemonType,
        args: {
          pokemonName: {
            type: graphql.GraphQLString
          },
        },
        resolve: (root, {pokemonName}) => {
          const pokemon = pokemonModel.findOne({'name': pokemonName})

          console.log(pokemon)
          return pokemon
        }
      }
    },
  })
})

module.exports = schema
