const request = require("request");
const btoa = require('btoa');
const dotenv = require('dotenv');

dotenv.config();

const { format } = require('date-fns');


const myUrl = "https://lipa.network/hooks/mpesa";
const myTestUrl = "https://9c26-105-163-1-187.ngrok.io/hooks/mpesa";


// create timestamp
function getTime () {
  let currentDate = format(new Date(), 'yMMddHHmmss');
  return currentDate;
}



// create passcode
function getPass(businessShortcode, timestamp){
const passKey = process.env.PASSKEY;

const pass_code = `${businessShortcode}${passKey}${timestamp}`;

// encode the passcode to base64
const encodedPass = btoa(pass_code);
return encodedPass;
}


// pass variables to mpesa function send request to M-Pesa API
async function mpesaRequest(token, sent_amount, sender_number, account_name) {

  const shortCode = process.env.SHORTCODE;


  let timeNow = getTime();  
  let myPass = getPass(shortCode, timeNow);

  let options = {
    method: "POST",
    url: "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: shortCode,
      Password: myPass,
      Timestamp: timeNow,
      TransactionType: "CustomerPayBillOnline",
      Amount: sent_amount,
      PartyA: sender_number,
      PartyB: shortCode,
      PhoneNumber: sender_number,
      CallBackURL: myTestUrl,
      AccountReference: account_name,
      TransactionDesc: `Ksh.${sent_amount} has been sent to ${account_name}`,
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


module.exports = { mpesaRequest, getPass, getTime };
