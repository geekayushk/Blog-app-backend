const mongoose=require("mongoose")


//creating schema
const UserSchema=new mongoose.Schema({
    profilePic:{
        type:String,
        default:"",
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    

},{timestamps:true}
);

module.exports=mongoose.model("User",UserSchema)