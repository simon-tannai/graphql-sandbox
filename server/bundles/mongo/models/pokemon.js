const mongoose = require('mongoose')

const Schema = mongoose.Schema

mongoose.Promise = Promise

const PokemonSchema = new Schema({
  abilities: Array,
  detailPageURL: {
    type: String,
    required: true,
  },
  weight: Number,
  weakness: Array,
  number: {
    type: String,
    required: true,
  },
  height: Number,
  collectibles_slug: String,
  featured: Boolean,
  slug: String,
  name: {
    type: String,
    required: true,
  },
  ThumbnailAltText: String,
  ThumbnailImage: String,
  type: Array,
}, {
  timestamps: true,
})

module.exports = mongoose.model('Pokemon', PokemonSchema)
