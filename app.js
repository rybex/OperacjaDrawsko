var express = require('express');
var app     = express();

app.use(express.static('public'));

app.get('/operacja-drawsko', function (req, res) {
  res.sendFile('./view/presentation.html', { root: __dirname });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
