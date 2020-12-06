const express  = require('express');
const router = express.Router();
const {  isAuth, isAdmin, requireSignin} = require('./../controllers/auth');
const { categoryById , create  , read , remove , update , list } = require('../controllers/category');
const {  userById } = require('../controllers/user');

router.get('/category/:categoryId', read );
router.post('/category/create/:userId', requireSignin , isAuth , isAdmin , create );
router.delete('/category/:categoryId/:userId',requireSignin , isAuth , isAdmin , remove);
router.put('/category/:categoryId/:userId', requireSignin , isAuth , isAdmin , update);
router.get('/categories', list);




//check on params via middleware
router.param('userId', userById );
router.param('categoryId',categoryById);



module.exports=router;
 