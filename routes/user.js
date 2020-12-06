const express = require('express');
const router = express.Router();
const { 
    requireSignin,
    isAuth,
    isAdmin  } = require('../controllers/auth');




const {
    userById,
    read,
    update,
    purchaseHistory
} = require('../controllers/user');




// router.get('/secret/:userId', requireSignin ,isAuth, isAdmin ,  ( req , res )=>{
//     console.log('secret from router');
//     res.json({
//         user:req.profile
//     });
// });

router.get('/user/:userId',requireSignin, isAuth, read);
router.put('/user/:userId',requireSignin, isAuth ,update);

router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);



//this middleware checks on request and adds props also
router.param('userId', userById ); 




module.exports=router;