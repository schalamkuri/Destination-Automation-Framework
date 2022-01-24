
const axios = require("axios");
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to CORS server 😁')
})
app.get('/cors', async (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  //res.send({ "msg": "This has CORS enabled 🎈" })
  const response = await axios.get('http://localhost:3000');
  //const data = await response.json();
  console.log(response)
  console.log("hamcho");
  /*
  var ham = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/directions/json?origin=2300+Nueces+Street+Austin&destination=101+E+21st+St+Austin&mode=walking&key=AIzaSyA4_UkJU3pP0Ch6HrIgH3h6T1jPrS9hAAQ',
    //url: "https://maps.googleapis.com/maps/api/directions/json?origin="+lat+","+long+"&destination="+apiFormat+"&arrival_time="+seconds+"&mode="+mode+"&key=AIzaSyA4_UkJU3pP0Ch6HrIgH3h6T1jPrS9hAAQ",
    headers: { }
  };
  

  axios(ham)
  .then(function (response) {
    
    var routes = response.data.routes[0];
    var legs = routes.legs;
    //console.log(response.data);
    res.send(response.data);
    //res.send({ "msg": "This has CORS enabled 🎈" })
  })
  .catch(function (error) {
    console.log(error);
  });
  */
  })

app.listen(8080, () => {
    console.log('listening on port 8080')
})

/*
var ham = {
      method: 'get',
      url: 'https://maps.googleapis.com/maps/api/directions/json?origin=2300+Nueces+Street+Austin&destination=101+E+21st+St+Austin&mode=walking&key=AIzaSyA4_UkJU3pP0Ch6HrIgH3h6T1jPrS9hAAQ',
      //url: "https://maps.googleapis.com/maps/api/directions/json?origin="+lat+","+long+"&destination="+apiFormat+"&arrival_time="+seconds+"&mode="+mode+"&key=AIzaSyA4_UkJU3pP0Ch6HrIgH3h6T1jPrS9hAAQ",
      headers: { }
    };
    
    axios(ham)
    .then(function (response) {
      
      var routes = response.data.routes[0];
      var legs = routes.legs;
      console.log(legs);
      res.send(legs);
    })
    .catch(function (error) {
      console.log(error);
    });
*/


