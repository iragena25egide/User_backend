const express = require('express');
const router = express.Router();
const UserSignup = require('../models/account');
const bcrypt = require('bcrypt');
//const {UserValidation} = require('../User_valid');
const { func } = require('@hapi/joi');
const { find } = require('../models/account');



const joi = require('@hapi/joi');


    const schema = joi.object({
        name:joi.string().required().min(8).max(16),
        email:joi.string().email().required(),
        position:joi.string().required(),
        password:joi.string().required().min(6).max(8)
    
    });
   






    


router.post('/signup', async (req,res)=>{

    //validation

    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    //for hasing password
    
    const salt = await bcrypt.genSalt(10);
    const{name, email, position, password} = req.body;
    

    const hash = await bcrypt.hash(password,salt);





    const signupUser =await new UserSignup({
        name,
        email,
        position,
       password:hash
    });
    try {
       const Post = await signupUser.save();
        res.json(Post);
    } catch (err) {
     res.status(400).send(err.message);
    }
});


router.get('/', async (req,res)=>{
 try {
    const posted = await  UserSignup.find();
    res.send(posted)
 } catch (error) {
    res.send('no posted yet')
 }
});


router.post('/login', async (req,res)=>{
    const{error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

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

router.get('/get', async (req,res)=>{
    try {
        const posted = await UserSignup.find(); 
    if(posted) return 
    res.json(posted);
    
        
    } catch (error) {
        return res.json('no post ')
    }
    
});



module.exports = router;