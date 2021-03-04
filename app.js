const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function (req, res) {
    const firstName = req.body.first;
    const lastName = req.body.last;
    const eMail = req.body.mail;

    var data = {
        members: [
            {
                email_address: eMail,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us1.api.mailchimp.com/3.0/lists/0dc2b6b3cd";

    const options = {
        method: "POST",
        auth: "kartikeya1:d808b61729176823350a01d74f7d86bf-us1"
    }

    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.send("Successfully Subscribed!");
        }
        else {
            res.send("There was an error!");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();


});

app.listen(3000, function () {
    console.log("Server is Running");
});