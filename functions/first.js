'use strict';

const user = require('../models/user');  
// const user = require('../models/fetchdata');

exports.first = (employeeId) => new Promise((resolve, reject) => {

    const newUser = new user({

        employeeId:employeeId
        
       
    });
    newUser
        .save()
        .then(() => resolve({
            status: 201,
            'employeeId' : employeeId
        }))
        .catch(err => {

                reject({
                    status: 500,
                    message: 'Internal Server Error !'
                });
        });

    })
