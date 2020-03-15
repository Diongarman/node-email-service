const express = require('express');
const { sendAngularCvEmail } = require('./emails/account');
const bodyParser = require('body-parser');

const app = express();

app.use(function(req, res, next) {
  console.log('MW run');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'accept, content-type');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept,x-auth'
  );
  next();
});

app.use(express.json());

const port = process.env.port || process.env.PORT;
app.use(bodyParser.json());

app.post('/email', (req, res) => {
  try {
    console.log(req.body);
    sendAngularCvEmail(req.body.emailAddress, req.body.subject, req.body.body);
    res.status(201).json({
      message: 'email was sent via sendgrid',
      email: req.body.emailAddress,
      subject: req.body.subject,
      body: req.body.body
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`I let my nuts drag whilst on port ${port}`);
});
