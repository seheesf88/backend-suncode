const mongoose = require('mongoose');

const houseSchema = mongoose.Schema({
  // street: String,
  address: { type : String },
  // address2: { type : String },
  city: {type: String}, // new* missing city..
  state: {type: String},
  zipcode: {type: String},
  year: {type: String},
  sqft: {type: String},
  memo: {type: String},
  // productImage: { type: String },
  productImage1: { type: String }, //one for House
  productImage2: { type: String }, // for attic
  productImage3: { type: String, required: true }, //for WH
  productImage4: { type: String, required: true }, //for Heating
  userId: {type: String},
  username: {type: String},
  // homeOwner: {type: String}, new*
  postingTime: {type: String},
  attic: {type: String}, //changed to atticSqFt
  // atticSqFt : {type: String},//new*
  // atticInsulation: {type: String}, // new*
  whyear: {type: String},
  whef: {type: String},
  whfuel: {type: String},
  heatyear: {type: String},
  heatef: {type: String},
  heatfuel: {type: String},
  status: {type: String},
  memo2: {type: String},

  //******* SAMPLE ********
  // - Address: "1338 Carlotta Avenue",
  // - City - State - Zip: "Berkeley, CA 94703",
  // Name: "Teresa",
  // Email: "tiareeser@gmail.com",
  // - Year: 1926,
  // - Sq Ft: 1290,
  // - House: "IMG_4946.JPG (https://dl.airtable.com/jeOU460fQ0WiiCQJdo3l_IMG_4946.JPG)",
  // - Attic: "IMG_4954.JPG (https://dl.airtable.com/JuD74N0GSGCaD7TE5vdo_IMG_4954.JPG)",
  // Attic Sq Ft: 1290,
  // Attic Insulation: "Unconditioned Attic",
  // Attic Insulation copy: "R-30",
  // -  Photo - WH: "IMG_4948.JPG (https://dl.airtable.com/FMqDyIwRQZyc7Lhv4GEL_IMG_4948.JPG)",
  // - WH 1 Year: 2016,
  // - WH 1 EF: 0.55,
  // - Photo - Heating: "IMG_4950.JPG (https://dl.airtable.com/5Zu16QehQO2eGyy1Y8hy_IMG_4950.JPG)",
  // - Heating 1 Year: 2016,
  // - Heating 1 EF: 0.86

});

module.exports = mongoose.model('House', houseSchema)

// const mongoose = require('mongoose');
//
// const houseSchema = new mongoose.Schema({
//   address: {type: String},
//   // address2: {type: String},
//   // state: {type: String},
//   // zipcode: {type: String},
//   // year: {type: String},
//   // sqft: {type: String},
//   pic1: {type: String},
//   // pic2: {type: String},
//   // pic3: {type: String},
//   // pic4: {type: String},
//   // memo: {type: String},
//   // attic: {type: String},
//   // whyear: {type: String},
//   // whef: {type: String},
//   // whfuel: {type: String},
//   // heatyear: {type: String},
//   // heatef: {type: String},
//   // heatfuel: {type: String},
//   // status: {type: String},
//   // memo2: {type: String},
//   // authorId: {type: String},
//   // authorname: { type: String},
//   // selectedFile: {}
// });
//
// module.exports = mongoose.model('House', houseSchema)
