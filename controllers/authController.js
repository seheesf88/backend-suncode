const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const User    = require('../models/user');


router.get('/', async(req, res) => {
  const AllUsers = await User.find({});
  res.json({
    user: AllUsers,
  })
})


router.post('/', async(req, res) => {
  console.log('here?');
  const email = req.body.email;

  const checkUser = await User.findOne({email: req.body.email})

  if(checkUser){
    res.json({
      status: 400,
      message: 'this email is already registered'
    })
  }else{
    const password = req.body.password;
    const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phNumber = req.body.phNumber;
    const emailNotice = req.body.emailNotice;
    const mobileNotice = req.body.mobileNotice;

    const UserDbEntry = {};
          UserDbEntry.email     = email;
          UserDbEntry.password  = hashedPassword;
          UserDbEntry.firstName = firstName;
          UserDbEntry.lastName  = lastName;
          UserDbEntry.phNumber  = phNumber;
          UserDbEntry.emailNotice = emailNotice;
          UserDbEntry.mobileNotice = mobileNotice;

  try {
    const user = await User.create(UserDbEntry);
    req.session.logged = true;
    req.session.userId = user._id;

    res.json({
      status: 200,
      data: 'register successful',
      userId: user._id,

      })

  }catch(err){
      res.send(err)
    }
  }
});

//login
router.post('/login', async(req, res) => {
  try{
    const foundUser = await User.findOne({email: req.body.email})
    if(foundUser){
      // console.log("Passwords = ", req.body.password, foundUser.password)
      const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);
      // console.log("PASSWORD MATCH = ", passwordMatches)
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        // console.log('JUST BEFORE LOGIN RESPONSE')
        req.session.message = '';
        req.session.logged = true;
        req.session.userId = foundUser._id
        res.json({
          status: 200,
          data: 'login successful',
          userId: foundUser._id
        });
      }else{
        req.session.message = 'email or password is not correct'
        res.status(401).json({
          status: 401,
          data: 'login unsuccessful'
        });
      }
    }else{
      req.session.message = 'email or password is incorrect';
      res.json({
        status: 401,
        data: 'login unsuccessful',
      });
    }
  }catch(err){
    res.send(err)
  }
})


//logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.send(err);
    }else{
      res.json({
        status: 200,
        data: 'logout successful'
      });
    }
  })
})

//edit User profile

router.get('/:id', async(req, res) => {
  try{
    const foundUser = await User.findById(req.params.id)
    res.json({
      status: 200,
      data: foundUser
    })
  }catch(err){
    res.send(err)
  }
})

router.put('/:id', async(req, res) => {
  try{
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

    const modifyProfile = {};

    modifyProfile.password = hashedPassword;
    modifyProfile.firstName = req.body.firstName;
    modifyProfile.lastName = req.body.lastName;
    modifyProfile.email = req.body.email;
    modifyProfile.phNumber = req.body.phNumber;


    const updatedUser = await User.findByIdAndUpdate(req.params.id, modifyProfile, {new:true});
    res.json({
      status: 200,
      data: 'user is updated',
      updatedUser: updatedUser
    })
  }catch(err){
    res.json(err)
  }
})



module.exports = router



// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const User = require('../models/user');
//
// //get all users - for admin
// router.get('/', async(req, res) => {
//   const AllUsers = await User.find({});
//   res.json({
//     user:AllUsers,
//   })
// })
//
// //get one user - for admin - users/:id is same as this
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
// });
//
// //create account
// router.post('/', async(req, res) => {
//
//   const email = req.body.email;
//
//   const checkUser = await User.findOne({email: req.body.email})
//
//   if(checkUser){
//     res.json({
//       status: 400,
//       message: 'this email is already registered'
//     })
//     console.log('this email is already registered')
//   }else{
//   //check if this email is already registered
//   const password = req.body.password;
//   const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const phNumber = req.body.phNumber;
//   const emailNotice = req.body.emailNotice;
//
//   const UserDbEntry = {};
//         UserDbEntry.email     = email;
//         UserDbEntry.password  = hashedPassword;
//         UserDbEntry.firstName = firstName;
//         UserDbEntry.lastName  = lastName;
//         UserDbEntry.phNumber  = phNumber;
//         UserDbEntry.emailNotice = emailNotice;
//
//   try {
//     const user = await User.create(UserDbEntry);
//     req.session.logged = true;
//     req.session.userId = user._id;
//
//     res.json({
//       status: 200,
//       data: 'register successful',
//       userId: user._id,
//
//       })
//
//   }catch(err){
//
//     res.send(err)
//   }
//
// }
// });
//
//
//
// router.put('/:id', async(req, res) => {
//   try{
//     const password = req.body.password;
//     const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
//
//     const modifyProfile = {};
//           modifyProfile.password = hashedPassword;
//           modifyProfile.firstName = req.body.firstName;
//           modifyProfile.lastName = req.body.lastName;
//           modifyProfile.email = req.body.email;
//           modifyProfile.phNumber = req.body.phNumber;
//
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, modifyProfile, {new:true})
//     res.json({
//       status: 200,
//       data: 'user is updated',
//       updatedUser: updatedUser
//     })
//   }catch(err){
//     console.log('put is err');
//     res.json(err)
//   }
// });
//
// //delete account
// router.delete('/:id', async(req, res) => {
//   try{
//     const deletedUser = await User.findByIdAndRemove(req.params.id);
//     res.json({
//       status: 200,
//       data: deletedUser
//     })
//   }catch(err){
//     res.send(err)
//   }
// });
//
//
//
// //**********logIn/logout********************//
//
// router.post('/login', async(req, res) => {
//   try{
//     const foundUser = await User.findOne({email: req.body.email})
//     // .catch((err) => console.log('caught it'));
//
//     if(foundUser){
//       const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);
//
//       // if(bcrypt.compareSync(req.body.password, foundUser.password)){
//       console.log('3');
//       if(passwordMatches){
//         req.session.message = '';
//         req.session.logged = true;
//         //req.session.username = foundUser.username;
//         // console.log('foundUser.username', foundUser.username);
//
//         req.session.userId = foundUser._id;
//
//         res.json({
//           status:200,
//           data: 'login successful',
//           userId: foundUser._id,
//           username: foundUser.username
//         })
//         // console.log("how about here? req.session?", req.session);
//       }else{
//         req.session.message = 'username or password is not correct'
//         res.status(401).json({
//           status: 401,
//           data: 'login unsuccessful1'
//         })
//       }
//     }else{
//       req.session.message = 'username or password is incorrect';
//       res.json({
//         status: 401,
//         data: 'login unsuccessful2 : username or password is incorrect',
//       })
//     }
//   }catch(err){
//     console.log('catch err');
//     res.send(err)
//   }
// });
//
//
// //logout get??
// router.get('/logout', (req, res) => {
//   console.log(req.session, '<--????');
//   req.session.destroy((err) => {
//     if(err){
//       console.log('i am error?');
//       res.send(err);
//     }else{
//       console.log('logout is successful');
//       res.json({
//         status: 200,
//         data: 'logout successful'
//       })
//     }
//   })
// });
//
//
//
// module.exports = router
