let multichain = require("multichain-node")({

    port:6726 ,

    host: '127.0.0.1',

    user: "multichainrpc",

    pass: "Htk4V34edzywb6FACMqLS8KqdozMVfzTkgxkGtwfXjVd"
        

});
function readRequest(params) {

    return new Promise((resolve) => {

        var key = params.key;

        var user = [];

        var response;    

    multichain.listStreamKeyItems({stream: "wallet","key": key}, (err, res) => {

        console.log(res)

        if(err == null){


                var string = '';

                var data=res[0].data;

                for (var j = 0; j < data.length; j += 2) {

                   string += String.fromCharCode(parseInt(data.substr(j, 2), 16))

                    }


                user.push({

                                            "publishers": res[0].publishers[0],

                                            "key": res[0].key,

                                            "data": string,

                                            "confirmations": res[0].confirmations,

                                            "blocktime": res[0].blocktime,

                                            "txid": res[0].txid,

                                            

                                        });

                   

        console.log("user",user);

         return resolve({response:user});

        }else{

            console.log(err)

        }

    })



})

   

}

function readAllRequest(params) {

    

    return new Promise((resolve) => {

        var user = [];

        var key = params.key

        console.log("key------>",'"'+key+'"')

        var response;    

    multichain.listStreamKeyItems({stream: "wallet", key:'"' +key+ '"'}, (err, res) => {

        console.log(res,"sri")

        if(err == null){


            for (let i = 0; i < res.length; i++) {

                var string = '';

                var data=res[i].data;

                for (var j = 0; j < data.length; j += 2) {

                   string += String.fromCharCode(parseInt(data.substr(j, 2), 16))

                    }

                user.push({

                                            "publishers": res[i].publishers[0],

                                            "key": res[i].key,

                                            "data": string,

                                            "confirmations": res[i].confirmations,

                                            "blocktime": res[i].blocktime,

                                            "txid": res[i].txid,

                                            

                                        });

                }   



        console.log("user",user);



         return resolve({response:user});

        }else{

            console.log(err)

        }

    })



})

   

}function readAllRequest(params) {

    

    return new Promise((resolve) => {

        var user = [];

        var key = params.key

        console.log("key------>",'"'+key+'"')

        var response;    

    multichain.listStreamKeyItems({stream: "wallet", key:key}, (err, res) => {

        console.log(res,"sri")

        if(err == null){



            for (let i = 0; i < res.length; i++) {

                var string = '';

                var data=res[i].data;

                for (var j = 0; j < data.length; j += 2) {

                   string += String.fromCharCode(parseInt(data.substr(j, 2), 16))

                    }


               user.push({

                                            "publishers": res[i].publishers[0],

                                            "key": res[i].key,

                                            "data": string,

                                            "confirmations": res[i].confirmations,

                                            "blocktime": res[i].blocktime,

                                            "txid": res[i].txid,

                                            

                                        });

                }   



        console.log("user",user);



         return resolve({response:user});

        }else{

            console.log(err)

        }

    })



})

   

}



module.exports = {

    readAllRequest: readAllRequest,

    readRequest:readRequest



};

