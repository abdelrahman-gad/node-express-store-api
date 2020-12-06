const { errorHandler } = require('../helpers/dbErrorHandler');
const Category = require('./../models/category');
exports.create = (req, res) => {
    const category = new Category(req.body);
      category.save((err, data) => {
         if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
         res.json({ data });
      });
};

// id
exports.categoryById = ( req, res , next , id) =>{
   
    Category.findById(id).exec((err , category) => {
         if(err || !category){
             return res.status(400).json({error:"category does not exist"});
         }
         req.category=category;
         next(); // proceed to the next step 
    });

}
exports.read = (req , res) => {
    //console.log(req.category);
    return res.json(req.category); 
}


exports.update=(req , res) => {

  const category = req.category; // category values was added to the request via the middleware categoryById
   
  console.log(category);
  category.name=req.body.name;

  //console.log(req.body.name);
  category.save( (err , data) => {
      if( err || !data  ){
          return res.status(400).json({
              err:errorHandler(err)
          });
      }

      return res.json(data);
  })
}

exports.remove=(req, res) => {
    const category  = req.category;
    category.remove((err, data) => {
        if(err || !data){
            return res.status(400).json({err:errorHandler(err)});
        }
        res.json({msg:'Category was deleted successfully'});
    });
}


exports.list = (req , res) => {
  Category.find().exec( (err , data) => {
      if(err){
          return res.status(400).json({error:errorHandler(err)})
      }
      res.json(data);
  });
}



// sell / arrival 









