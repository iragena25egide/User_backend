const { text } = require('body-parser');
const mongoose = require('mongoose');



const Accschema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});



 


module.exports = mongoose.model('Accsignup', Accschema);