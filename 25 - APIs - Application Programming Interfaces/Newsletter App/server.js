const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {
    const firstName = req.body['first-name'];
    const lastName = req.body['last-name'];
    const email = req.body['email'];

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/b908676823/";
    const options = {
        methods: "POST",
        auth: "abhijeetshahakar:a6394a1e56ec2ac2a65f31bb996d5601-us9"
    }

    const request = https.request(url, options, (response) => {
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", (d) => {
            console.log(JSON.parse(d));
        });
    });

    request.write(jsonData);
    request.end();
});

app.get("/failure", (req, res) => {
    res.redirect('/');
});

app.listen(3000);

// a6394a1e56ec2ac2a65f31bb996d5601-us9
// b908676823