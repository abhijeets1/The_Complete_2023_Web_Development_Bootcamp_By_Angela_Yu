const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const cityName = req.body.cityName;
    const apiKey = "1eb2d413d047d79d9ed7fb854a0a446f";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + cityName + "&units=" + units;

    https.get(url, (rs) => {
        rs.on("data", (data) => {
            const weatherData = JSON.parse(data);
            let imageurl = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + ".png";

            res.write("<h1>Temperature: " + weatherData.main.temp + "</h1>");
            res.write("<h3>City: " + weatherData.name + "</h3>");
            res.write("<img src='" + imageurl + "'>");

            res.send();
        });
    });
});

app.listen(3000);