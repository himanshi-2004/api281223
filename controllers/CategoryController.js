const CategoryModel = require("../models/Category")
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken')

cloudinary.config({
    cloud_name: "dwy8hd761",
    api_key: "822826584515219",
    api_secret: "tOwVhCBcpcPxothANYLY3kaYcX4",
    // secure: true
  });

class CategoryController{
 
        static createcategory = async(req,res)=>{
            try{
                const users = await CateogryModel.find()
              //console.log(user)
              res.status(201).json({
                status:"success",
                message:"Successful",
                users,
              })
            }
            catch(err){
                console.log(err)
            }
        }
  static insertcategory = async(req,res)=>{
    try{
         const {category_name} = req.body

         const image = req.files.image;
    //  console.log(image)
    const imageupload = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "profileimageapi",
    });
         const result = await CategoryModel({
             category_name:category_name,
             image:{
                public_id: imageupload.public_id,
                url:  imageupload.secure_url
            }
         })
         await result.save()
         res.status(201).send({
            status: 'success',
            message: 'Category Created Successfully 😃🍻',
            result,
        })
         

    }
    catch(err){
        console.log(err)
    }
  }

       static displaycategory = async(req,res)=>{
          try{
                   const result = await CategoryModel.find() 
                   res.status(201).json({
                    status:"success",
                    message:"Successful",
                    result,
                  })
          }
          catch(err){
            console.log(err)
          }
       }

      static  getsinglecategory = async(req,res)=>{
         try{
                const user = await CategoryModel.findById(req.params.id)
                res.status(201).json({
                    success:true,
                    user,
                  })
         }
         catch(err){
            console.log(err)
         }
      }
      static updatecategory = async(req,res)=>{
        try{
                //for deletig the image from cloudinary
                               //code start
                               const category= await CategoryModel.findById(req.params.id)
                               const imageid = category.image.public_id
                            //    console.log(imageid)
                            await cloudinary.uploader.destroy(imageid)
                               //code end
//update image code start
                          // console.log(req.files.image)
                const file = req.files.image
                const imageupload = await cloudinary.uploader.upload(file.tempFilePath,{
                    folder:'profileimageapi',
                })

                const {category_name}= req.body
                 const result = await CategoryModel.findByIdAndUpdate(req.params.id,{
                    category_name:category_name,
                    image:{
                        public_id: imageupload.public_id,
                        url:  imageupload.secure_url
                    }

                 })
                 await result.save()
                 res.status(200).json({
                    success: true,
                    message: 'Category updated sucessfully',
                    result,
                  })
        }
        catch(err){
            console.log(err)
        }
      }
  

         static deletecategory = async(req,res)=>{
            try{

                const user = await CategoryModel.findByIdAndDelete(req.params.id)
                res.status(200).json({
                    success: true,
                    message: 'Category deleted sucessfully',
                    
                  })
            }
            catch(err){
                console.log(err)
            }
         }
}
module.exports  = CategoryController