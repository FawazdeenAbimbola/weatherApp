const express = require('express');
const bodyParser =  require('body-parser');
const https = require('https');

const app = express();

app.use(express.static('./public/'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});
app.get('index.html', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

app.post('/', function(req, res){
    const query = req.body.cityName;
    const apiKey = "f55d4ce341ce3211be67e21ffdd88347";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response){
        response.on('data', (data) =>{
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const image = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/" + image + "@2x.png";

             res.write(`
             
        
             <html>
             <head>
             <link rel="stylesheet" href="./css/style.css" type="text/css">
             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
             <body>
             <header class="site-header">
             <nav class="site-nav">
                <h1 class="logo">WEATHAR</h1>
                <div class="location">
                    <p><i class="fa fa-map-marker" aria-hidden="true"></i> ${weatherData.name} </p>
                </div>
                <div class="home">
                    <a href = "" class="home-btn" type="submit">Go to Home</a>
                </div>
                </nav>
                <div class="weather-app">
                <div>   
                <p>${temp}&deg;</p>
                    <img src="${imageUrl}" alt="logo">
                    </div>
                    <div>

                    <span id="description">${description}</span>
                    </div>
                    </div>
                </header>
                </body>
                </html>
             
             
             `);
        res.send();
        })
      
    
    })
    
});
app.listen('3000', function(){
console.log('server started at port 3000');
})

