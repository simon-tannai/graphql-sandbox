const graphql = require('graphql')

module.exports = new graphql.GraphQLObjectType({
  name: 'Pokemon',
  fields: {
    _id: graphql.GraphQLString
    abilities: [graphql.GraphQLString],
    detailPageURL: graphql.GraphQLString,
    weight: graphql.GraphQLInt,
    weakness: [graphql.GraphQLString],
    number: graphql.GraphQLString,
    height: graphql.GraphQLInt,
    collectibles_slug: graphql.GraphQLString,
    featured: graphql.GraphQLBoolean,
    slug: graphql.GraphQLString,
    name: graphql.GraphQLString,
    ThumbnailAltText: graphql.GraphQLString,
    ThumbnailImage: graphql.GraphQLString,
    type: [graphql.GraphQLString]
  }
})
