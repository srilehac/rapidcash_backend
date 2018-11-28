'use strict';

const user = require('../models/user');

/*exports.getdetails = () => {

    return new Promise((resolve, reject) => {

        newUser.find({
            "employeeId":employeeId
        })
            .then(report => {
                console.log("report", report)
               
                resolve({
                    status: 201,
                    report: report
                })

            }) 
                 .catch(err => {

                if (err.code == 11000) {

                    return reject({
                        status: 409,
                        message: 'cant fetch !'
                    });

                } else {
                    console.log("error occurred" + err);

                    return reject({
                        status: 500,
                        message: 'Internal Server Error !'
                    });
                }
            })
    }) 
}; */

exports.getdetails=(employeeId) =>{
    var user = [];
 return  new Promise((resolve, reject) => {

        user.find({
            //"employeeId":employeeId
        })
        .then((getdetails) =>{
              for(let i=0;i<getdetails.length;i++){
                report.push(getdetails[i])
            }
            console.log("report",report)
        })
        .then(() => resolve({
            status: 201,
            message: report
        }))
       

            .catch(err => {

                    reject({
                        status: 500,
                        message: 'Internal Server Error !'
                    });
            });

        })
    }
