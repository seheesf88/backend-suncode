const express = require('express');
const router  = express.Router();

const User        = require('../models/user');
const House       = require('../models/house');
const Attic       = require('../models/attic');
const Roof        = require('../models/roof');
const SpHeater    = require('../models/spheater');
const WaHeater    = require('../models/waheater');
const Utility     = require('../models/utility');

//get my acc
// router.get('/:id', async(req, res) => {
//   try{
//     const foundUser = await User.findById(req.params.id)
//     res.json({
//       status: 200,
//       data: foundUser
//
//     })
//   }catch(err){
//     res.send(err)
//   }
// })

router.get('/:id', async(req, res) => {
  try{
    const foundUser = await User.findById(req.params.id)
    const foundHouse = await House.findOne({'house._id': req.params.id})
    const foundAttic = await Attic.findOne({'attic._id': req.params.id})
    const foundRoof = await Roof.findOne({'roof._id': req.params.id})
    const foundWaHeater = await SpHeater.findOne({'spHeater._id': req.params.id})
    const foundSpHeater = await WaHeater.findOne({'waHeater._id': req.params.id})
    const foundUtility = await Utility.findOne({'utility._id': req.params.id})

    res.json({
      status: 200,
      user: foundUser,
      house: foundHouse,
      attic: foundAttic,
      roof: foundRoof,
      waHeater: foundWaHeater,
      spHeater: foundSpHeater,
      utility: foundUtility
    })
  }catch(err){
    console.log("Get user request err - ", err)
    res.send(err)
  }
})


//delete my acc
router.delete('/:id', async(req, res) => {
  try{
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    res.json({
      status: 200,
      data: deletedUser
    })
  }catch(err){
    res.send(err)
  }
})



module.exports = router


// const express = require('express');
// const router = express.Router();
// const bcrypt  = require('bcryptjs');
//
// const User = require('../models/user');
// const House  = require('../models/house');
// const Attic  = require('../models/attic');
// const Roof  = require('../models/roof');
// const Waheater = require('../models/waheater');
// const SpHeater  = require('../models/spheater');
//
// //EACH USER CAN REGISTER ONLY ONE HOUSE FOR NOW.
// // router.get('/allhouses', async(req, res) => {
// //     const allHouses = await House.find({});
// //     res.json({
// //       data : allHouses
// //     })
// // });
//
//
// //one user's house - house details, attics, roof, water heater, space heater
// router.get('/house/:id', async(req, res) => {
//   console.log('what is req.params.id? ===>', req.params.id);
//   try{
//     const foundUser = await User.findById(req.params.id);
//     const foundHouse = await House.findOne({userId: req.params.id});
//     const foundRoof = await Roof.findOne({userId: req.params.id});
//     const foundAttic = await Attic.findOne({userId: req.params.id});
//
//
//     res.json({
//       status: 200,
//       house: foundHouse,
//       roof: foundRoof,
//       attic: foundAttic,
//     })
//   }catch(err){
//     console.log('fail????');
//     res.send(err)
//   }
// });
//
//
// //bring one user information
// router.get('/:id', async(req, res) => {
//   try{
//     const foundUser = await User.findById(req.params.id)
//     res.json({
//       status: 200,
//       data: foundUser
//     })
//   }catch(err){
//     res.send(err)
//   }
// })
//
// //edit user account
// router.put('/:id', async(req, res) => {
//   try{
//     const modifyProfile = {};
//     const password = req.body.password;
//     const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
//     modifyProfile.password = hashedPassword;
//     // modifyProfile.username = req.body.username;
//     modifyProfile.email = req.body.email;
//
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, modifyProfile, {new:true})
//     res.json({
//       status: 200,
//       data: 'user is updated',
//       updatedUser: updatedUser
//     })
//
//
//   }catch(err){
//     console.log('put is err');
//     res.json(err)
//   }
// })
//
// //delete user account
// router.delete('/delete/:id', async(req, res) => {
//   try{
//     const deletedUser = await User.findByIdAndRemove(req.params.id);
//     res.json({
//       status: 200,
//       data: deletedUser
//     })
//   }catch(err){
//     res.send(err)
//   }
// })
//
//
// module.exports = router
