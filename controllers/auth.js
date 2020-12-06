const User = require('../models/user');
const jwt = require('jsonwebtoken'); // generate jwts
const expressJwt = require('express-jwt'); // authorization check
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup=(req,res) => {
    console.log("req.body",req.body);
    const user = new User(req.body);
    user.save( (err,user)=>{
        
        if(err){
            console.log('error has happened');
          return res.status(400).json({
              err:'Email is taken'
            });
        }
        user.salt=undefined;
        user.hashed_password=undefined;
        res.json({
            user
        });
    } );
 // res.json({message:'Hi thats me'});
}


exports.signin = (req , res )=>{
   //find user based on emai
   const {email , password} = req.body;
   User.findOne({email}, ( err, user ) => {
    // if error or user does't exist
       if(err || !user){ 
           return res.status(400).json({
               error:'User not found Please sign up'
           });
       }

       // if user exist match email and password
       //create authinetication method in user model
        if(!user.authenticate(password)){
            return res.status(400).json({
                error:"Email and Password do not match"
            })
        }
       //generate signed token with user id and secret
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);

        //persist the user as 't' and set an expiry date   
         res.cookie('t',token,{expire:new Date() + 9999});

        //response the token and the user to the front-end client
        const {_id , name , email , role} = user;
        return res.json({token, user:{_id, name, email, role}});
   } );
}


exports.signout= (req ,res)=>{
    res.clearCookie("t");
    res.json({message:"Signed out successfully"});
}


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});

exports.isAuth = (req ,res , next ) => {
    let user = req.profile && req.auth && req.profile._id ==req.auth._id;
    if(!user){
        return res.status(403).json({
            error:'Access denied'
        })
    }
    next();
}
exports.isAdmin= (req , res , next)=>{
  if(req.profile.role === 0){
      return res.status(403).json({
          error:"Admin resource ! . not authorized"
      })
  }  
  next();
}

