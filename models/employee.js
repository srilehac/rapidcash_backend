
'use strict';

const mongoose = require('mongoose');

const employeepageSchema = mongoose.Schema({

    employeeId: Number,
    employeeName: String, 
    walletDetail : Number,
    designation : String,
    projectManager: String,
    currentProject: String,
   
});


mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/digitalId', { useMongoClient: true });

mongoose.connect('mongodb://rapidcash:rapidcash1234@ds141613.mlab.com:41613/rapidcash', {useMongoClient: true});



module.exports = mongoose.model('employee', employeepageSchema);