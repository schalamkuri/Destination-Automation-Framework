
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
  })

app.listen(8080, () => {
    console.log('listening on port 8080')
})


