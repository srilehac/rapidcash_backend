/*!'use strict';

const user = require('../models/user');  
// const user = require('../models/fetchdata');

exports.admin = (employeeId, AssetName, AssetValue) => {
return new Promise((resolve, reject) => { 

    const newUser = new user({

        employeeId: employeeId,
        AssetName : AssetName,
        AsestValue: AssetValue
    });
    newUser
        .save()
        .then((result) => resolve({
            status: 201,
            message: 'successfully supplied',
            user: newUser
        }))
        .catch(err => {
            
                console.log("error occurred" + err);
                reject({
                    status: 500,
                    message: 'Internal Server Error !'
                });
            });
});
}*/


//'use strict';

//const user = require('../models/user');  
// const user = require('../models/fetchdata');

/*exports.admin = (employeeId,AssetName, AssetValue) => {

    console.log(employeeId,"sri")

    const Data= new user({

        employeeId : employeeId,
        AssetName : AssetName,
        AssetValue : AssetValue
    });
    console.log(Data,"hi")

      Data.save()
      res.send("success")
  // console.log(result,"woow")
        /*.then(() => resolve({
            status: 200,
            message: "success"

        }))
        .catch(err => {

                reject({
                    status: 500,
                    message: 'Internal Server Error !'
                });

        });*/
       

    //}
