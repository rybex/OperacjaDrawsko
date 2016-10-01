var express = require('express');
var app     = express();

var port = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('./view/presentation.html', { root: __dirname });
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
