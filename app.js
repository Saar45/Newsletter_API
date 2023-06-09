require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

    const data = {
       members: [
        {
            email_address: req.body.Mail,
            status: "subscribed",
            merge_fields: {
                FNAME: req.body.FirstName,
                LNAME: req.body.LastName,
            }
        }
       ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/095f539b3f";

    const options = {

        method: "POST",
        auth: process.env.MYKey
    };

   const request = https.request(url, options, function (response) {
        
    response.statusCode === 200 ? res.sendFile(__dirname + "/success.html"):res.sendFile(__dirname + "/failure.html");
        
        
    });

    request.write(jsonData);
    request.end();
});



app.post("/failure", function (req, res) {
    res.redirect("back");
})





app.listen(process.env.PORT || 3000, function () {
    console.log("We're up!!");
});
