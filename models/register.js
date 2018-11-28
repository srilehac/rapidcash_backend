
'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerpageSchema = mongoose.Schema({

    firstname: String,
    lastname: String, 
    phonenumber : Number,
    dateofbirth : String,
    email : {
        type: String,
        unique: true
    },
    password: String,
    retypepassword: String,
    employeeId: String
     
});


mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/digitalId', { useMongoClient: true });

mongoose.connect('mongodb://rapidcash:rapidcash1234@ds141613.mlab.com:41613/rapidcash', {useMongoClient: true
});



module.exports = mongoose.model('register', registerpageSchema);