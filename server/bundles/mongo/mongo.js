const mongoose = require('mongoose')

function connect() {
  mongoose.connect('mongodb://mongo/graphql')
  .then(() => {
    console.log('Connected to MongoDB')
  },
  (e) => {
    console.log(`Cannot connect to MongoDB: ${e.message}`)
  })
  .catch((e) => {
    console.log(`Cannot connect to MongoDB: ${e.message}`)
  })
}

module.exports = {
  connect
}
