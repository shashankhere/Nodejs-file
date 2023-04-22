//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
   res.sendFile(__dirname+"/validation.html");
});

app.post("/", function(req, res){
    var firstNm = req.body.fname;
    var email = req.body.email;
    var data ={
        members:[
            {
                email_address:email,
                status :"subscribed",
                merge_fields:{
                    FNAME:firstNm
                }
            }
        ]
    }

    var jsonData =JSON.stringify(data);

    const url ="https://us9.api.mailchimp.com/3.0/lists/6f6d4a65b3";
    const options ={
        method : "POST",
        auth:"shashank1:75c55208f9f1b7aa0a9f13090117f14a-us9"
    }
    const request = https.request(url, options, function(response){
       if(response.statusCode === 200){
         res.sendFile(__dirname+"/success.html");
       }else{
         res.sendFile(__dirname+"/failure.html");
       }
       response.on("data",function(data){
           console.log(JSON.parse(data));
       })
    })

    request.write(jsonData);
    request.end();
});

app.listen(3000, function(){
    console.log("server is running at port 3000");
});

//api key
//75c55208f9f1b7aa0a9f13090117f14a-us9
//list id: 6f6d4a65b3.


