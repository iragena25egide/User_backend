const express = require('express');
const router = express.Router();
const UserSignup = require('../models/account');
const bcrypt = require('bcrypt');
const {UserValidation, Loginvalidation} = require('../User_valid');
const { func } = require('@hapi/joi');








    


router.post('/signup', async (req,res)=>{

    const error = UserValidation(req.body);
   if(!error)  return res.status(400).send(error.details[0].message);

    const salt = await bcrypt.genSalt(10);
    const{name, email, position, password} = req.body;
    const hash = await bcrypt.hash(password,salt);
    const signupUser = await new UserSignup({
        name,
        email,
        position,
        password:hash
    });
    try {
        const Post = await signupUser.save();
        res.json(Post);
    } catch (error) {
       return  res.json({message: error});
    }
});


router.get('/', async(req,res)=>{

});


router.post('/login', async (req,res)=>{

    UserSignup.findOne({email: req.body.email}, function(Post,signupUser){
        if(signupUser === null){
            res.json('your account never exist create it');
        }else{
            bcrypt.compare(req.body.password,signupUser.password,  (err,signupUser)=>{
                if(signupUser){
                    return res.status(200).json({ msg: "Login success" })
                } else {
                    return res.status(401).json({ msg: "wrong password" })
                }
            });
            

        }
    });

});



module.exports = router;