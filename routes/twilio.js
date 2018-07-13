//import * as Express from 'express';
const Express = require('express');
const TwilioRouter = Express.Router();
module.exports = TwilioRouter;

const TwilioClient =require('../lib/twilio');

/* GET home page. */
TwilioRouter.get('/', (req, res) => {
  //res.render('index', { title: 'Express' });
  res.type('application/text');
  res.writeHead(200, {
    'Content-Type': 'application/text'
});
  res.write('Hello from Twilio');
  res.end()
});

TwilioRouter.get('/echo', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/text'
    });
    res.write(client.echo(req.rawHeaders));
    res.end();
});

// Define a handler for when the fax is initially sent
TwilioRouter.post('/fax/sent', (req, res) => {
    // Let's manually build some TwiML. We can choose to receive the
    // fax with <Receive>, or reject with <Reject>.
    const twiml = `
    <Response>
      <Receive action="/fax/received"/>
    </Response>
    `;
  
    // Send Fax twiml response
    res.type('text/xml');
    res.send(twiml);
  });
  
  // Define a handler for when the fax is finished sending to us - if successful,
  // We will have a URL to the contents of the fax at this point
  TwilioRouter.post('/fax/received', (req, res) => {
    // log the URL of the PDF received in the fax
    console.log(req.body.MediaUrl);

    //const client = new TwilioClient();
  
    // Respond with empty 200/OK to Twilio
    res.status(200);
    res.send();
  });

  TwilioRouter.get('/fax/listAll', (req, res) => {
      const client = new TwilioClient();
      //this.client.fax.faxes().fetch().then(faxes => console.log(fax.))
      const txt = client.getAllFaxes()
        .then(faxes => faxes.map(f => 'Fax sid ' + f.sid + ' from ' + f.from + ' to ' + f.to).join("\n\n"))
        .done();
      res.writeHead(200, {
        'Content-Type': 'application/text'
    });
    res.write(txt);
    res.end();
  });

  TwilioRouter.get('/fax/list/:sid', (req, res) => {
    const client = new TwilioClient();
    //this.client.fax.faxes().fetch().then(faxes => console.log(fax.))
    const txt = client.getFaxBySid(req.query.sid)
      .then(fax => 'Fax sid ' + f.sid + ' from ' + f.from + ' to ' + f.to + ' status ' + f.status)
      .done();
    res.writeHead(200, {
      'Content-Type': 'application/text'
  });
  res.write(txt);
  res.end();
});
