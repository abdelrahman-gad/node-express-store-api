const mongoose  = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:32,
        unique: true
    }
},{timestamps:true});

categorySchema.plugin(uniqueValidator);
module.exports=mongoose.model('Category',categorySchema);
