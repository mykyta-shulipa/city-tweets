var express = require('express');

var app = express();
var staticPath = __dirname + '/public/';

app.use(express.static(staticPath));

app.listen(3000);
console.log('The server is listening on port 3000');