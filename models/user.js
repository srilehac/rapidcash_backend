'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    employeeId  : Number,
    AssetName   : String,
    AssetValue  : Number,
    awarded     : String,
    value       : Number
});


mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/digitalId', { useMongoClient: true });

mongoose.connect('mongodb://rapidcash:rapidcash1234@ds141613.mlab.com:41613/rapidcash', {useMongoClient: true
});


module.exports = mongoose.model('user', userSchema);
