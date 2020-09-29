const express = require('express');
const app     = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

require('./db/db');

app.use(session({
  secret: 'fdjkajldkjfkla',
  resave: false,
  saveUninitialized: false,
}));

//-----MIDDLEWARE---------
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3000', 'https://react-suncode.herokuapp.com', 'http://react-suncode.herokuapp.com'],
  credentials: true,
  optionsSuccessStatus:200
}


app.use(cors(corsOptions));
app.use('/public', express.static('public'));
// app.use('/uploads', express.static('uploads'))
//--------------------------


const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const houseController = require('./controllers/houseController');
const roofController = require('./controllers/roofController');
const atticController = require('./controllers/atticController');
const waheaterController = require('./controllers/waheaterController');
const spheaterController = require('./controllers/spheaterController');
const utilityController = require('./controllers/utilityController');


app.use('/api/v1/auth', authController);
app.use('/api/v1/users', userController);
app.use('/api/v1/house', houseController);
app.use('/api/v1/roof', roofController);
app.use('/api/v1/attic', atticController);
app.use('/api/v1/waheater', waheaterController);
app.use('/api/v1/spheater', spheaterController);
app.use('/api/v1/utility', utilityController);



app.listen(process.env.PORT || 9000, () => {
  console.log('I am working')
})
