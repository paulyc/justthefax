const twilio = require('twilio');
const auth = require('../conf/secrets');
const utils = require('./utils');
const assert = require('assert');

function TwilioClient() {
	this.client = twilio(auth.accountSid, auth.authToken);
}

TwilioClient.__prototype__.sendFaxPdf = function (sender, receiver, pdfUri) {
	assert(utils.verifyNANPNumber(sender));
	assert(utils.verifyNANPNumber(receiver));
	pdfUri = pdfUri || 'https://www.twilio.com/docs/documents/25/justthefaxmaam.pdf';
	return this.client.fax.faxes.create({
		from: sender,
		to: receiver,
		mediaUrl: pdfUri
	});
};
