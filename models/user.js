const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  firstName: {type: String},
  lastName: {type: String},
  phNumber: {type: String},
  email: {
    type: String,
    // required: true,
    // unique: true,
    // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {type: String},
  emailNotice: {type: String},
  // house: { type: mongoose.Schema.Types.ObjectId, ref: 'house'},
  userId: {type: String}
});


module.exports = mongoose.model('User', userSchema)
