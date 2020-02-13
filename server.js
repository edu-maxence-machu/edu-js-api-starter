let express = require('express');
let app = express();
let path = require('path');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

app.use(express.static(__dirname + '/public'));
app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);
console.log('Listening on http://localhost:8080');
