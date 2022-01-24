const request = require("request");
const btoa = require('btoa');

const dotenv = require('dotenv');
dotenv.config();

const { format } = require('date-fns');


const myUrl = "https://lipa.network/hooks/mpesa";
const myTestUrl = "https://534a-105-163-1-158.ngrok.io/hooks/mpesa";


// create timestamp
const getTime = () => {
  let currentDate = format(new Date(), 'yMMdHHmmss');
  return currentDate;
} 


// create passcode
function getPass(businessShortcode){
const passKey = process.env.PASSKEY;

var pass_code = `${businessShortcode}${passKey}${timeNow}`;

// encode the passcode to base64
var encodedPass = btoa(pass_code);
return encodedPass;
}


// pass variables to mpesa function send request to M-Pesa API
function mpesaRequest(token, sent_amount, sender_number, matatu_ref, shortcode) {

  let timeNow = getTime();  
  let myPass = getPass(shortcode);

  var options = {
    method: "POST",
    url: "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: myPass,
      Timestamp: timeNow,
      TransactionType: "CustomerPayBillOnline",
      Amount: sent_amount,
      PartyA: sender_number,
      PartyB: shortcode,
      PhoneNumber: sender_number,
      CallBackURL: myTestUrl,
      AccountReference: matatu_ref,
      TransactionDesc: `Ksh.${sent_amount} has been sent to ${matatu_ref}`,
    }),
  };
  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve(body);
    });
  });
}


module.exports = { mpesaRequest };
