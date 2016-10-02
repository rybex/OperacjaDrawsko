var express        = require('express');
var path           = require('path');
var bodyParser     = require('body-parser')
var app            = express();
var cors           = require('cors');

var apiKey = process.env.MAILGUN_API || 'key-46cebd38c59ac222e6fbcf1581411eaf'
var domain = process.env.MAILGUN_DOMAIN || 'sandboxf0212096472d43109ac45a55542348ec.mailgun.org'
var receiver = process.env.MAILGUN_RECEIVER || 'tomek.rybka@gmail.com'

var mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});

var port = process.env.PORT || 8080;
var jsonParser = bodyParser.json()

app.use(cors());
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('./index.html', { root: __dirname });
});

app.post('/send_email', jsonParser, function (req, res) {
  var data = {
    from: 'Zapytanie o Biała szkołe <mailgun@sandboxf0212096472d43109ac45a55542348ec.mailgun.org>',
    to: receiver,
    subject: 'Zapytanie od Biała szkołe!',
    text: req.body.message + '\n' + 'Telefon klienta: ' + req.body.phone + '\n' + 'Dane klienta: ' + req.body.name
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(error);
    console.log(body);
  });
  res.send('Email sent');
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
