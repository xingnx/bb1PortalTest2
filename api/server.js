// grab the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// routes will go here

app.post('/api', function(req, res) {
//taking params from req.body
  var input = req.body.input;
  var method= req.body.method;
  var token = req.body.token;

  var http = require('http');
  var options = {
    host: 'localhost',
    port: 8081,
    path: '/bb1portal/test'+method,
    method: 'POST',
    headers: {'Content-Type': 'application/json','input-string': input, 'Authorization': 'Bearer '+token}
  };

// making request with options and return the call with chunk
  http.request(options, function(resswag) {
    resswag.setEncoding('utf8');
    resswag.on('data', function (chunk) {
      res.send(chunk);
    });
  }).end();

});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);