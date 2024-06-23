const router=require("express").Router();
const { Router } = require("express");
const User=require("../models/User");
const bcrypt=require('bcrypt');

//Register

//if you are creating something post method is used
router.post("/register",async(req,res)=>{
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPass=await bcrypt.hash(req.body.password, salt);
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass,
            
        })
        const user=await newUser.save();
        res.status(200).json(user)
        //200 is successful status
    }catch(err){
        // 500 status means something wrong with mongodb or express
        res.status(500).json(err);
    }

});
//Login
router.post("/login",async(req,res)=>{
    try{
        //findOne because user is unique
        const user=await User.findOne({username:req.body.username})
        //making sure if user exists
        //400 is wrong user credentials status
        if(!user){
            res.status(400).json("wrong credentials!")
        return;
        }
        //checking password for validation using becrypt comarison
        const validated=await bcrypt.compare(req.body.password,user.password)
        if(!validated){
        res.status(400).json("wrong credentials!")
        return;
        }
        //destructuring assignment to extract the password property from the user._doc object and store it in a variable called password. The rest of the properties from user._doc are being stored in an object called others
        const{password,...others}=user._doc
        res.status(200).json(others)
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports=router;