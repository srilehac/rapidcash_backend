router.post('/royalsundaramcalculatepremium', async(req,res)=>{
    const calculatepremium = req.body;
    if(!calculatepremium) return res.status(400).send("Invalid request");
    const requestBody = '<?xml version="1.0"?>'+ json2xml(calculatepremium);
    //console.log(requestBody);
    fetch("https://dtcdoc.royalsundaram.in/Services/Product/TwoWheeler/CalculatePremium",{
        method: "POST",
        port:9000,
        headers: {
          Accept: "application/xml",
          'Content-Type': 'application/xml',
          //'x-access-token': token
          // 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjIwMCwibWVzc2FnZSI6IkxvZ2dlZCBpbiBzdWNjZXNzZnVsbHkiLCJ1c2VycyI6W3siX2lkIjoiNWExYmFhNTYyYzZiOTEzNzYzMmM3ZWVjIiwiZW1haWwiOiJhcnVuLmhvc3NhbWFuaUByYXBpZHF1YmUuY29tIiwicGFzc3dvcmQiOiJqWmFlNzI3SzA4S2FPbUtTZ09hR3p3dy9YVnFHci9QS0VnSU1ranJjYkpJPSIsInJhcGlkSUQiOiJCd2JNd0E2YjFIaEUxNC91TFdweVJXS3EzMytBVUJINnd6UjZtQzh0OUowPSIsInVzZXJPYmplY3QiOnsiZm5hbWUiOiJhcnVuIiwibG5hbWUiOiJob3NzYW1hbmkiLCJwaG9uZSI6IjkxODM2OTk2NDU4MiJ9LCJ1c2VydHlwZSI6IkRpcmVjdCBDbGllbnRzIiwib3RwIjoxMTAwLCJlbmNvZGVkTWFpbCI6IllYSjFiaTVvYjNOellXMWhibWxBY21Gd2FXUnhkV0psTG1OdmJRPT0iLCJjcmVhdGVkX2F0IjoiTW9uIE5vdiAyNyAyMDE3IDExOjMxOjU4IEdNVCswNTMwIChJU1QpIiwiY291bnQiOjAsIl9fdiI6MCwic3RhdHVzIjpbInBob25lIiwiZW1haWwiXX1dLCJpYXQiOjE1MTUwNTA3NDcsImV4cCI6MTUxNTExMDc0N30.xZ_K-mE7WfAszkFrGMATmm9EpCmtYgdOyydVL4HGPVk'
        },
        body : requestBody
    }).then((res)=>{
        return res.text();
        
    }).then((value)=>{
       console.log(parser.toJson(value),"goood")
       var response = parser.toJson(value);
       response =JSON.parse(response)
       let status =(response.PREMIUMDETAILS.Status.Message)
       if(status == "Premium Calculated and Quote Saved Successfully"){

       let Gross_Premium = response.PREMIUMDETAILS.DATA.GROSS_PREMIUM
       let Quote_Id = response.PREMIUMDETAILS.DATA.QUOTE_ID
       let IDV = response.PREMIUMDETAILS.DATA.IDV
       console.log(Gross_Premium,Quote_Id,IDV,"") 
       data = new Array;
       data.push({"Quote_Id":Quote_Id},{"IDV":IDV},{"Gross_Premium":Gross_Premium},{"Date":new Date()}) 
       console.log(data,"woow")     
       const transactiondetails = ({
        data: data,
        key:Quote_Id
    });
    bcSdk.savetransaction({
        Transactiondetails:transactiondetails   
         })
         
         res.status(200).send(response)
        }
      else{
         res.status(400).send(response)

      }
    
    }).catch((err)=>{
        console.log("Something happened at CalculatePremium",err);
    })

}); 