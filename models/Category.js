const mongoose=require("mongoose")


//creating schema
const CategorySchema=new mongoose.Schema({
   name:{
    type:String,
    required:true,
   }

},{timestamps:true}
);

module.exports=mongoose.model("Category",CategorySchema)