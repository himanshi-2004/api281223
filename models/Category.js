const mongoose = require('mongoose')
const CategorySchema = new  mongoose.Schema ({
      category_name:{
        type:String,
        Required:true,
      },
   
     
      image:{
        public_id:{
            type:String,
        }   ,
        url:{
            type:String,
        },
      }

},{timestamps:true})
const CategoryModel = mongoose.model('cateogry',CategorySchema)

module.exports = CategoryModel
