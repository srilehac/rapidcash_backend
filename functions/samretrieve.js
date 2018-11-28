'use strict';
const report = require('../models/user');

exports.retrieve=(employeeId) =>{
 return new Promise((resolve, reject) => {
    var cont=[];
    var build =[];
    var notbuild =[];

        user.find({
            "employeeId":employeeId
        })
        .then((users) =>{
                 console.log(users.length)
            for(let i=0;i<users.length;i++){

              cont.push(users[i]._doc.report)
             
             }
             console.log(cont);
             console.log(cont.length)
             for (let i=0;i<cont.length;i++){
             if (typeof cont[i] !== 'undefined'){
                 build.push(i)
                 console.log(build)
             }else{
                notbuild.push(i)
                console.log(notbuild)
             }
            }
             if (build.length<1){  
        resolve({
              status: 201,
                message:"Please enter value"
            })
        }else{  
        reject({ 
             status: 409,
             message:"Profile Already Built"
           })
        }
        })
          
            .catch(err => {

                    reject({
                        status: 500,
                        message: 'Internal Server Error'
                    });
            });

        })
    }