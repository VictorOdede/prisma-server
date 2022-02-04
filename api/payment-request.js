const { tokenRequest } = require("./token-request");
const { mpesaRequest } = require("./mpesa-request");
const { sendMessage } = require("./send-sms");


// Use async function to allow time to resolve
async function paymentRequest(sent_amount, sender_number, matatu_reg, businessShortcode) {
  
  // test data
  // var amount = 1;
  // var sender = 254716305157;
  // var matatu = "KAD 123w";

  amount = sent_amount;
  sender = sender_number;
  matatu = matatu_reg;
  paybill = businessShortcode;

  // Wait for token to resolve 
  var newToken = await tokenRequest();

  // Call the mpesa payment request and pass the access token
  var myRequest = await mpesaRequest(newToken, amount, sender, matatu, paybill);

  // sort the return data from mpesa API                      
  console.log(myRequest);

  // if transaction is successful, send text message to matatu number
  //   await sendMessage(matatu_phone, sent_amount, sender_number);
}


module.exports = { paymentRequest };
