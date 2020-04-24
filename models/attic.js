const mongoose = require('mongoose');

const atticSchema = mongoose.Schema({
  atticImg: { type: String },
  roofConstruction: { type : String },//dropBox
  atticType: {type: String},
  atticFloor: {type: String},
  roofYear: {type: String},
  insulMaterial: {type: String},
  userId: {type: String},
});

module.exports = mongoose.model('Attic', atticSchema)
