'use strict';
const user = require('../models/user');
var bcSdk = require('../multichain/invoke.js')


exports.sample = (employeeId,awarded,value) => new Promise((resolve, reject) => {


    const newUser = new user({


          employeeId : employeeId,
          awarded : awarded,
          value : value

    });
     var data = new Array;

        data.push({"EmployeeId":employeeId
    },{"awarded":awarded},{"value":value})
    const transactiondetails = ({

        data: data,

        key:employeeId


    });
    bcSdk.savetransaction({

        Transactiondetails:transactiondetails   

         })

  

    newUser

        .save()

        .then(() => resolve({

            status: 201,

            message: 'success',
            report : newUser

        }))

        .catch(err => {



            if (err.code == 11000) {



                reject({

                    status: 409,

                    message: 'Data are not entered !'

                });



            } else {



                reject({

                    status: 500,

                    message: 'Internal Server Error !'

                });

            }

        });

});

