
'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
var crypto = require('crypto');
var path = require('path');
var cloudinary = require('cloudinary').v2;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var cors = require('cors');

const login = require('./functions/login');
const register = require('./functions/register');
const admin = require('./functions/admin');
const first = require('./functions/first');
const wallet = require('./functions/wallet');
const samretrieve= require('./functions/samretrieve');
const getdetails= require('./functions/getdetails');
const employee= require('./functions/employee');
const express = require('express');

const router = express.Router();
const user = require('./models/user'); 
const emp = require('./models/employee'); 
const reg = require('./models/register'); 




module.exports = router=> {


    router.post('/login', cors(), (req, res) => {
        console.log("entering login function in functions ");
        const email = req.body.email;
        console.log(email);
        const password = req.body.password;
        console.log(password);
       
       
        login
            .loginUser(email, password)
            .then(result => {   
          
                res.send({
                    "message": "Login Successful",
                    "status": true,
                    //"usertype":result.users.usertype,
                    "employeeId":result.users.employeeId

                });

            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));

    });

//-----------------------------------------------------------------------------------//


router.post('/register', cors(), (req, res) => { 

    const firstname = req.body.firstname;
    console.log(firstname);
    const lastname = req.body.lastname;
    console.log(lastname);
    const phonenumber = parseInt(req.body.phonenumber);
    console.log(phonenumber);
    const dateofbirth = req.body.dateofbirth;
    console.log(dateofbirth);
    const email = req.body.email;
    console.log(email);
    const password = req.body.password;
    console.log(password);
    const retypepassword = req.body.retypepassword;
    console.log(retypepassword);
   
    var  employeeId = "";
    var possible = "0123456789674736728367382772898366377267489457636736273448732432642326734"
    for (var i = 0; i < 3; i++)
        employeeId += (possible.charAt(Math.floor(Math.random() * possible.length))).toString();
    console.log("employeeId" + employeeId)


    if (!firstname || !lastname || !phonenumber|| !dateofbirth || !email || !password || !retypepassword  || !employeeId) {

        res
            .status(400)
            .json({
                message: 'Invalid Request !'
            });

    } else {

        register
            .register(firstname, lastname, phonenumber,dateofbirth,email,password, retypepassword,employeeId)
            .then(result => {

                res.send({
                    "message": "user has been registered successfully",
                    "status": true,
                    "result" : result.id.employeeId

                });

            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));
    }
});

//----------------------------------------------------------------------------------//


router.post('/admin', async(req, res) =>{
    
    const employeeId = req.body.employeeId;
    console.log(employeeId);
    const AssetName = req.body.AssetName;
    console.log(AssetName);
    const AssetValue = req.body.AssetValue;
    console.log(AssetValue);
     
    const Data= new user({

        employeeId : employeeId,
        AssetName : AssetName,
        AssetValue : AssetValue
    });
   

     const result =  await Data.save()
     console.log(Data,"hi")
     console.log(result,"good")
     res.send(result)
     //})
   
    
});

//-----------------------------------------------------------------------------------//


router.post('/first', cors(), async(req, res) => {
    
    //const employeeId = req.body.employeeId;
    const find = await reg.findOne({employeeId:req.body.employeeId})

    
   console.log(find)
   res.send(find)
});
    

//---------------------------------------------------------------------------------//

/*router.post('/employee', async(req, res) =>{
    
    const employeeId = req.body.employeeId;
    console.log(employeeId);
    const employeeName = req.body.employeeName;
    console.log(employeeName);
    const walletDetail = req.body. walletDetail;
    console.log( walletDetail);
    const designation = req.body.designation;
    console.log(designation);
    const projectManager = req.body. projectManager;
    console.log( projectManager); 
    const currentProject = req.body.currentProject;
    console.log( currentProject); 


    const user= new employee({

        employeeId : employeeId,
        employeeName:  employeeName,
        walletDetail : walletDetail,
        designation : designation,
        projectManager : projectManager,
        currentProject : currentProject

    });
   

     const result =  await user.save()
     console.log(user,"hi")
     console.log(result,"good")
     res.send(result)

    });*/

//-------------------------------------------------------------------------------------------------//

router.post('/retrieve', cors(), async(req, res) => {
    
    //const employeeId = req.body.employeeId;
    const find = await user.find({employeeId:req.body.employeeId},{_id:false})

    
   console.log(find)
   res.send(find)
});
    
//-------------------------------------------------------------------------------------------------//

router.post('/employee', cors(), (req, res) => { 

    const employeeId = req.body.employeeId;
    console.log(employeeId);
    const employeeName = req.body.employeeName;
    console.log(employeeName);
    const walletDetail = req.body. walletDetail;
    console.log( walletDetail);
    const designation = req.body.designation;
    console.log(designation);
    const projectManager = req.body. projectManager;
    console.log( projectManager); 
    const currentProject = req.body.currentProject;
    console.log( currentProject); 
   
    if (!employeeId || !employeeName || !walletDetail || !designation || !projectManager || !currentProject) {

        res
            .status(400)
            .json({
                message: 'Invalid Request !'
            });

    } else {
            employee.employee(employeeId,employeeName,walletDetail,designation,projectManager,currentProject)
            .then(result => {

                res.send({
                    "message": result.message,
                    "status": true,
                    "employee" : result.employee

                });

            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));
    }
});

//----------------------------------------------------------------------------------//

/*router.post('/employeedetail', cors(), async(req, res) => {
    
    //const employeeId = req.body.employeeId;
    const find = await employee.find({employeeId:req.body.employeeId},{_id:false})

   console.log(find)
   res.send(find)
});*/


/*router.get('/employeedetail', async function (req, res) {

    // Retrieve the tag from our URL path
    var id = req.query.id;
    console.log(id)

    let result = await emp.find({employeeId:id});

    res.send(result)
});*/


router.get('/employeedetail', async function (req, res) {

     console.log(JSON.stringify(req.headers));
    //var id = req.query.id;
    var id=req.headers.employeeid;

    console.log(id)

    let result = await emp.find({employeeId:id});

    res.send(result)
});





//----------------------------------------------------------------------------------------------//

router.post('/wallet', cors(), (req, res) => { 

    const employeeId = req.body.employeeId;
    console.log(employeeId);
    const awarded = req.body.awarded;
    console.log(awarded);
    const value = req.body.value;
    console.log(value);
   
    if (!employeeId || !awarded || !value) {

        res
            .status(400)
            .json({
                message: 'Invalid Request !'
            });

    } else {

            wallet.sample(employeeId,awarded,value)
            .then(result => {

                res.send({
                    "message": result.message,
                    "status": true,
                    "report" : result.report


                });

            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));
    }
});


//--------------------------------------------------------------------------------------------//

const  readAllRequest = require('./multichain/query')

const  bcSdk=  require('./multichain/query')

//const express = require('express');

//const router = express.Router();

const fetch = require("node-fetch");
router.post('/readAllrequest', async (req, res) => {

        

    const key = req.body.key;
     console.log('key',key);

           bcSdk.readAllRequest({

               key:key

           })


           .then((response) => {

                console.log("data in response " + JSON.stringify(res.key))

    

               return res.status(200).send(response);

            })

    

           .catch(err => {

    

               if (err.code == 401) {

    

                   return res.status(400).send("can't fetch");

    

               } else {

                    console.log("error occurred" + err);

    

                   return res.status(500).send("internal server error");

                }

            })

        })
//-----------------------------------------------------------------------------------//
const  readRequest = require('./multichain/query')

//const  bcSdk=  require('./multichain/query')

//const express = require('express');

//const router = express.Router();

//const fetch = require("node-fetch");
router.post('/readrequest', async (req, res) => {

        

    const key = req.body.key;
     console.log('key',key);

           bcSdk.readRequest({

               key:key

           })

    

           .then((response) => {

                console.log("data in response " + JSON.stringify(res.key))

    

               return res.status(200).send(response);

            })

    

           .catch(err => {

    

               if (err.code == 401) {

    

                   return res.status(400).send("can't fetch");

    

               } else {

                    console.log("error occurred" + err);

                   return res.status(500).send("internal server error");

                }

            })

        })

//---------------------------------------------------------------------------------------------------//

/*router.post('/retrieve', cors(), async(req, res) => {
    
    //const employeeId = req.body.employeeId;
    const find = await user.find({employeeId:req.body.employeeId},{_id:false})

   console.log(find)
   res.send(find)
});*/

//---------------------------------------------------------------------------------------------------//
router.get('/details', async function (req, res) {

    // Retrieve the tag from our URL path
    var id = req.query.id;
    console.log(id)

    let result = await user.find({employeeId:id});

    res.send(result)
});

//----------------------------------------------------------------------------------------------------//
function checkId(req) {

    const id = req.headers['employeeId'];
    if (id) {

        try {

            return true;


        } catch (err) {

            return false;
        }

    } else {

        return false;
    }
}


}