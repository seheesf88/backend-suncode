const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost/energy'
const URI = 'mongodb+srv://houseadmin:houseadmin1@cluster0-vjphq.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect( URI || process.env.MONGODB_URI || connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log(`mongoose connected to ${connectionString}`)
})

mongoose.connection.on('error', (err) =>{
  console.log(`mongoose error `, err)
})

mongoose.connection.on('disconnected', () =>{
  console.log(`mongoose disconnected from ${connectionString}`)
})
