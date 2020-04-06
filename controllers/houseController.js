const express = require('express');
const router  = express.Router();
//*************** photo ****************
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
var crypto = require('crypto')
const path = require('path');
const URI = 'mongodb+srv://houseadmin:houseadmin1@cluster0-vjphq.mongodb.net/test?retryWrites=true&w=majority'



// const storage = multer.diskStorage({
//   destination: './public/uploads/',
//   filename: function (req, file, cb) {
//     console.log('what is file??', file);
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });



const storage = new GridFsStorage({
  url: URI,
  file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            console.log('storage err');
            return reject(err)
          }
          const filename = file.originalname
          console.log('filename', filename);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
          }
          resolve(fileInfo)
        })
      })
    },
})



const upload = multer({
  storage: storage,
  limits: {fileSize: 100000000}, // 1 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
// }).single('photo'); // name: 'picture' in form
}).array('photo', 4); // name: 'picture' in form


function checkFileType(file, cb) { // checks file type,
  //allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime type
  const mimetype = filetypes.test(file.mimetype);
  console.log('hihihihi');
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}



//*************** photo ****************


const House  = require('../models/house');
const User = require('../models/user');


//house list
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

//one house
router.get('/:id', async(req, res) =>{
  try{
    const foundUser = await User.findById(req.params.id);
    const foundHouse = await House.findOne({userId: req.params.id});
    res.json({
      status: 200,
      data: foundHouse
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
      console.log(req.files[0]);
        const createdPost = await House.create({
          productImage1: `${req.files[0].filename}`,
          productImage2: `${req.files[0].filename}`,
          productImage3: `${req.files[0].filename}`,
          productImage4: `${req.files[0].filename}`,
          // productImage1: `public/uploads/${req.files[0].filename}`,
          // productImage2: `public/uploads/${req.files[1].filename}`,
          // productImage3: `public/uploads/${req.files[2].filename}`,
          // productImage4: `public/uploads/${req.files[3].filename}`

        });

        createdPost.address = req.body.address;
        createdPost.city = req.body.city;
        createdPost.state = req.body.state;
        createdPost.zipcode = req.body.zipcode;
        createdPost.year = req.body.year;
        createdPost.sqft = req.body.sqft;
        createdPost.memo = req.body.memo;
        createdPost.userId = req.body.userId;
        createdPost.username = req.body.username;
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
// const storage = multer.diskStorage({
//   destination: function(req, file, cb){
//     cb(null, './public/uploads/');
//   },
//   filename: function(req, file, cb){
//     cb(null, new Date().toISOString() + file.originalname)
//   }
// })
// const fileFilter = (req, file, cb) => {
//   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
//     cb(null, true)
//   }else {
//     cb(null, false);
//   }
// }
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });
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
// });
//
// //report show
// router.get('/:id', async(req, res) => {
//   try{
//     const foundHouse = await House.findById(req.params.id)
//     res.json({
//       status: 200,
//       data: foundHouse
//     })
//   }catch(err){
//     res.send(err)
//   }
// });
//
// // //create house
// // router.post('/', async(req, response) => {
// //   // console.log(`Report Create: ${req.body}`)
// //   console.log(req.body);
// //
// //   try{
// //     const createdHouse = await House.create(req.body);
// //     createdHouse.authorId = req.session.userId;
// //     createdHouse.authorname = req.session.username;
// //     console.log('createdHouse', createdHouse);
// //     createdHouse.save((err, savedHouse) => {
// //       response.json({
// //         status: 200,
// //         data: savedHouse,
// //       })
// //     })
// //     // console.log('here?');
// //   }catch(err){
// //     console.log('error????_?');
// //     response.send(err)
// //   }
// // });
//
//
// router.post('/', upload.single('productImage'), (req, res, next) => {
//   console.log('req.session ======>', req.session);
//   console.log('path?????', req.file);
//   const userId = req.session.userId
//   console.log('userid from session', userId);
//   const product = new House({
//     _id: new mongoose.Types.ObjectId(),
//     street: req.body.street,
//     address: req.body.address,
//     state: req.body.state,
//     zipcode: req.body.zipcode,
//     year: req.body.year,
//     sqft: req.body.sqft,
//     productImage: req.file.path,
//     // productImage1: req.files[0].path,
//     // productImage2: req.files[1].path,
//     // productImage3: req.files[2].path,
//     // productImage4: req.files[3].path,
//     userId: userId
//   });
//
//   console.log('what is product', product);
//   product
//     .save()
//     .then(result => {
//       console.log('what is result?', result);
//       res.status(201).json({
//         message: 'handle post route',
//         createdProduct: {
//             _id: result._id,
//             street: result.street,
//             address: result.address,
//             state: result.state,
//             zipcode: result.zipcode,
//             year: result.year,
//             sqft: result.sqft,
//             userId: "??",
//             request: {
//               type: 'GET',
//               url: 'http://localhost:9000/api/v1/house/' +  result._id
//             }
//         }
//       });
//     })
//     .catch(err => {
//       console.log('error: post request fail');
//       res.status(500).json({
//         error: err
//       })
//     });
//
// })
//
//
// //house edit
// router.put('/:id', async(req, res) => {
//   try{
//     const updatedHouse = await House.findByIdAndUpdate(req.params.id, req.body, {new: true});
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
//   }catch(err){
//     res.send(err)
//   }
// });
//
//
// module.exports = router


// const storage = multer.diskStorage({
//   destination: function(req, file, cb){
//     cb(null, './public/uploads/');
//   },
//   filename: function(req, file, cb){
//     cb(null, new Date().toISOString() + path.extname(file.originalname))
//   }
// })
// const fileFilter = (req, file, cb) => {
//   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
//     cb(null, true)
//   }else {
//     cb(null, false);
//   }
// }
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });
