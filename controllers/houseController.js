const express = require('express');
const router  = express.Router();
//*************** photo ****************
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const URI = 'mongodb+srv://houseadmin:houseadmin1@cluster0-vjphq.mongodb.net/test?retryWrites=true&w=majority'


const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    // console.log('what is file??', file);
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {fileSize: 100000000}, // 1 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
}).single('houseImg'); // name: 'picture' in form
// }).array('photo', 4); // name: 'picture' in form


function checkFileType(file, cb) { // checks file type,
  //allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}



//*************** photo ****************


const House  = require('../models/house');
const User = require('../models/user');


//house detail list
router.get('/', async(req, res) => {
  try{
    const allhouses = await House.find();
    res.json({
      status: 200,
      data: allhouses
    })
  }catch(err){
      res.send(err)
  }

});

//one house details
router.get('/:id', async(req, res) =>{
  try{
    const foundUser = await User.findById(req.params.id);
    const foundHouse = await House.findOne({userId: req.params.id});

    res.json({
      status: 200,
      data: foundHouse,
    })


  }catch(err){
    console.log('house_one_get_err', err);
    res.send(err)
  }

});

router.post('/', (req, res) => {

  upload(req, res,  async (err) => {
    if (err){
        console.log("route.post - error", err)
        res.json(err);
    }else{

        const createdPost = await House.create({
          houseImg: `public/uploads/${req.file}`,
        });
        //myCasa 01
        createdPost.address = req.body.address;
        createdPost.city = req.body.city;
        createdPost.state = req.body.state;
        createdPost.zipCode = req.body.zipCode;
        createdPost.houseYear = req.body.houseYear;
        createdPost.houseSqft = req.body.houseSqft;
        // createdPost.ceilingHeight = req.body.ceilingHeight;
        // createdPost.numOfRooms = req.body.numOfRooms;
        // createdPost.numOfStories = req.body.numOfStories;
        // createdPost.dirOfHouse = req.body.dirOfHouse;

        createdPost.userId = req.body.userId;
        // createdPost.username = req.body.username;
        createdPost.postingTime = req.body.postingTime;

        createdPost.save((err, savedPost) => {
          res.json({
            msg: 'file uploaded',
            newPost: savedPost,
          });
        });
    }
  });
});




//house edit
router.put('/:id', async(req, res) => {
  try{
    const foundUser = await User.findById(req.params.id);
    const foundHouse = await House.findOne({userId: req.params.id})
    console.log('foundhouse', foundHouse);
    const updatedHouse = await House.findByIdAndUpdate(foundHouse._id, req.body, {new: true});
    res.json({
      status: 200,
      data: updatedHouse
    })
  }catch(err){
    res.send(err)
  }
});


//house delete
router.delete('/:id', async(req, res) => {
  try{
    const deletedHouse = await House.findByIdAndRemove(req.params.id);
    res.json({
      status: 200,
      data: deletedHouse
    })

  }catch(err){
    res.send(err)
  }
});


module.exports = router
// const express = require('express');
// const router  = express.Router();
// //*************** photo ****************
// const mongoose = require('mongoose');
// const multer = require('multer');
// const path = require('path');
//
// // const crypto = require('crypto')
// // const GridFsStorage = require('multer-gridfs-storage');
// // const Grid = require('gridfs-stream');
// const URI = 'mongodb+srv://houseadmin:houseadmin1@cluster0-vjphq.mongodb.net/test?retryWrites=true&w=majority'
// //create mongo connection
// // const conn = mongoose.createConnection(URI)
// // let gfs
// //
// // conn.once('open', () => {
// //   gfs = Grid(conn.db, mongoose.mongo)
// //   gfs.collection('uploads')
// //   console.log('Connection Successful')
// // })
//
//
// // const storage = new GridFsStorage({
// //   url: URI,
// //   file: (req, file) => {
// //       return new Promise((resolve, reject) => {
// //         crypto.randomBytes(16, (err, buf) => {
// //           if (err) {
// //
// //             return reject(err)
// //           }
// //           const filename = file.originalname
// //           const fileInfo = {
// //             filename: filename,
// //             bucketName: 'uploads',
// //           }
// //           resolve(fileInfo)
// //         })
// //       })
// //     },
// // })
//
// // const upload = multer({storage});
//
// const storage = multer.diskStorage({
//   destination: './public/uploads/',
//   filename: function (req, file, cb) {
//     // console.log('what is file??', file);
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });
//
// const upload = multer({
//   storage: storage,
//   limits: {fileSize: 100000000}, // 1 MB
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb)
//   }
// // }).single('photo'); // name: 'picture' in form
// }).array('photo', 4); // name: 'picture' in form
//
//
// function checkFileType(file, cb) { // checks file type,
//   //allowed extensions
//   const filetypes = /jpeg|jpg|png|gif/;
//   //check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // check mime type
//   const mimetype = filetypes.test(file.mimetype);
//
//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb('Error: Images only!');
//   }
// }
//
//
//
// //*************** photo ****************
//
//
// const House  = require('../models/house');
// const User = require('../models/user');
//
//
// //house list
// router.get('/', async(req, res) => {
//   try{
//     const allhouses = await House.find();
//     res.json({
//       status: 200,
//       data: allhouses
//     })
//   }catch(err){
//       res.send(err)
//   }
//
// });
//
// //one house
// router.get('/:id', async(req, res) =>{
//   try{
//     const foundUser = await User.findById(req.params.id);
//     const foundHouse = await House.findOne({userId: req.params.id});
//
//     res.json({
//       status: 200,
//       data: foundHouse,
//     })
//
//
//   }catch(err){
//     console.log('house_one_get_err', err);
//     res.send(err)
//   }
//
// });
//
// router.post('/', (req, res) => {
//
//   upload(req, res,  async (err) => {
//     if (err){
//         console.log("route.post - error", err)
//         res.json(err);
//     }else{
//
//         const createdPost = await House.create({
//           productImage1: `public/uploads/${req.files[0].filename}`,
//           productImage2: `public/uploads/${req.files[1].filename}`,
//           productImage3: `public/uploads/${req.files[2].filename}`,
//           productImage4: `public/uploads/${req.files[3].filename}`
//
//         });
//         //myCasa 01
//         createdPost.address = req.body.address;
//         createdPost.city = req.body.city;
//         createdPost.state = req.body.state;
//         createdPost.zipcode = req.body.zipcode;
//
//         createdPost.year = req.body.year;
//         createdPost.sqft = req.body.sqft;
//         createdPost.memo = req.body.memo;
//         createdPost.userId = req.body.userId;
//         createdPost.username = req.body.username;
//         createdPost.postingTime = req.body.postingTime;
//
//         createdPost.save((err, savedPost) => {
//           res.json({
//             msg: 'file uploaded',
//             newPost: savedPost,
//           });
//         });
//     }
//   });
// });
//
//
//
//
// //house edit
// router.put('/:id', async(req, res) => {
//   try{
//     const foundUser = await User.findById(req.params.id);
//     const foundHouse = await House.findOne({userId: req.params.id})
//     console.log('foundhouse', foundHouse);
//     const updatedHouse = await House.findByIdAndUpdate(foundHouse._id, req.body, {new: true});
//     res.json({
//       status: 200,
//       data: updatedHouse
//     })
//   }catch(err){
//     res.send(err)
//   }
// });
//
//
// //house delete
// router.delete('/:id', async(req, res) => {
//   try{
//     const deletedHouse = await House.findByIdAndRemove(req.params.id);
//     res.json({
//       status: 200,
//       data: deletedHouse
//     })
//
//   }catch(err){
//     res.send(err)
//   }
// });
//
//
// module.exports = router
