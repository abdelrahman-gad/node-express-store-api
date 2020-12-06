const express = require('express');
const mongoose = require('mongoose');
const cors  = require('cors');
const expressValidator = require('express-validator');
//logging requests package
const morgan = require('morgan');

//parsing body of requests before handlers
const bodyParser = require('body-parser');

const cookieParser=require('cookie-parser');

const app = express();

require('dotenv').config();

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes =require('./routes/category');
const productRoutes =require('./routes/product');
const orderRoutes =require('./routes/order');

const braintreeRoutes =require('./routes/braintree');




//connect to database
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.8lvjm.mongodb.net/${process.env.MONGO_DB_DATABASE}`,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    }).then( () => {
        console.log('database connection ok');
    });



// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());



// use routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', braintreeRoutes);

//listen to ports
const port = process.env.port || 8000;
app.listen( port ,() => {
    console.log(`Server is Running on ${port}`)
});