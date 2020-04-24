const mongoose = require('mongoose');

const waterSchema = mongoose.Schema({
  waterImg: { type: String },
  waterYear: {type: String},
  waterType: {type: String},
  userId: {type: String},
});

module.exports = mongoose.model('Water', waterSchema)
