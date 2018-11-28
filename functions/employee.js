'use strict';
const employee = require('../models/employee');
var bcSdk = require('../multichain/invoke.js')


exports.employee = (employeeId,employeeName,walletDetail,designation,projectManager,currentProject) => new Promise((resolve, reject) => {

    const detail = new employee({

          employeeId     : employeeId,
          walletDetail   : walletDetail,
          designation    : designation,
          projectManager : projectManager,
          currentProject : currentProject

    });
     var emp = new Array;

        emp.push({"EmployeeId":employeeId
    },{"walletDetail":walletDetail},{"designation":designation},{"projectManager":projectManager},{"currentProject":currentProject})
    const transactiondetails = ({

        data: emp,

        key:employeeId


    });
    bcSdk.savetransaction({

        Transactiondetails:transactiondetails   
         })

    detail

        .save()

        .then(() => resolve({

            status: 201,

            message: 'success',
            employee : detail

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

