const mongoose = require('mongoose');

const houseSchema = mongoose.Schema({
  houseImg: { type: String },
  address: { type : String },
  city: {type: String},
  state: {type: String},
  zipcode: {type: String},
  houseYear: {type: String},
  houseSqft: {type: String},
  // ceilingHeight : {type: String},
  // numOfRooms : {type: String},
  // numOfStories : {type: String},
  // dirOfHouse : {type: String},
  userId: {type: String},
  //postingTime: {type: String},
  //status: {type: String},
});

module.exports = mongoose.model('House', houseSchema)

// const mongoose = require('mongoose');
//
// const houseSchema = mongoose.Schema({
//   address: { type : String },
//   city: {type: String}, // new* missing city..
//   state: {type: String},
//   zipcode: {type: String},
//   year: {type: String},
//   sqft: {type: String},
//   memo: {type: String},
//   productImage1: { type: String }, //one for House
//   productImage2: { type: String }, // for attic
//   productImage3: { type: String, required: true }, //for WH
//   productImage4: { type: String, required: true }, //for Heating
//   userId: {type: String},
//   username: {type: String},
//   postingTime: {type: String},
//   attic: {type: String},
//   whyear: {type: String},
//   whef: {type: String},
//   whfuel: {type: String},
//   heatyear: {type: String},
//   heatef: {type: String},
//   heatfuel: {type: String},
//   status: {type: String},
//   memo2: {type: String},
//
// });
//
// module.exports = mongoose.model('House', houseSchema)
