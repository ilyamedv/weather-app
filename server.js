const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

let request = require ("request");
let z = process.env.OWM_API_KEY;

app.get('/', function(req, res){
  console.log ('in the app.get method!')
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  console.log ('in the app.post method!');
  console.log (req.body.city);

  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${z}`;


  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})



app.listen(3000, function(){
  console.log('Example app is listening on port 3000!')
})
