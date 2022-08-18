const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');


const UserRoute = require('./routes/User');
const { post } = require('./routes/User');


const app =express();
app.use(bodyParser.json());
app.use('/', UserRoute)

app.get('/',(req,res)=>{
    res.send('am on mi project')
});


mongoose.connect(
    process.env.DATABASE,
    options,
    (err) =>{
        if(err) console.log(err)
        else console.log('mongodb is connected');
    }
    //{UseNewUrlParser: true},
    //()=>console.log('database is now connected'));
);  




app.listen(5000,()=>console.log('app is listen on port'));