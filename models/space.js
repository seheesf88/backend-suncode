const mongoose = require('mongoose');

const spaceSchema = mongoose.Schema({
  spaceImg: { type: String },
  spaceYear: {type: String},
  spaceType: {type: String},
  userId: {type: String},
});

module.exports = mongoose.model('Space', spaceSchema)
