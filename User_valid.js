const joi = require('@hapi/joi');


const UserValidation = ()=>{
    const schema = joi.object({
        name:joi.string().required().min(8).max(16),
        email:joi.string().email().required(),
        position:joi.string().required(),
        password:joi.string().required().min(6).max(12)
    
    });
   return  schema.validate()
};

const Loginvalidation =() =>{
    const schema = joi.object({
        email:joi.string().email().required(),
        password:joi.string().required().min(6).max(12)
    
    });
   return  schema.validate()
}


module.exports.UserValidation = UserValidation;
module.exports.Loginvalidation = Loginvalidation;
