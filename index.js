//basic express app
const express = require('express');
const app = express();

//importing the routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//listening to the port
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});