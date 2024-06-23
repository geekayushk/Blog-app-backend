const router=require("express").Router();
const { Router } = require("express");
const User=require("../models/User");
const Post=require("../models/Post");
const bcrypt=require("bcrypt");

//UPDATE

//only logged-in user can update profile of himself only
//put gor updation
router.put("/:id",async(req,res)=>{
    // console.log(req)
    if(req.params.id===req.body.userid){
    //     console.log(req.body.userid);
    // console.log(req.params.id)
        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            //updating the password with bcrypt one
            req.body.password=await bcrypt.hash(req.body.password,salt)
        }
    try{
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{
            //set is predefined i.e here set everything present in body
            $set:req.body,
        },{new:true});
       res.status(200).json(updatedUser);
    }catch(err){
        // 500 status means something wrong with mongodb or express
        res.status(500).json(err);
    }
}
else{
    //401 is not allowed
   res.status(401).json("you can update only your account!"); 
}

});

//DELETE
router.delete("/:id",async(req,res)=>{
    //if we are deleting user we must delete all his posts also
    if(req.params.id===req.body.userid){
    try{
        const user=await User.findById(req.params.id)
        try{
            await Post.deleteMany({username:user.username})
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user deleted successfully");
        }catch(err){
        // 500 status means something wrong with mongodb or express
        res.status(500).json(err);
    }

   }catch(err){
        //404 if user is not there
       res.status(404).json("user not found");
   }  
}
else{
    //401 is not allowed
   res.status(401).json("you can delete only your account!"); 
}

});

//GET USER

router.get("/:id",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        const {password,...others}=user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports=router;