// specify sendpoint to receive response data

// configure the POST request

// await response, log data


const request = require('request');
const dotenv = require('dotenv');


dotenv.config();


const c2bRequest = async (sender, amount, token) => {

    const shortCode = process.env.SHORTCODE;

    const options = {
        method: "POST",
        url: "https://api.safaricom.co.ke/mpesa/c2b/v2",
        headers: {
            Authentication: `Bearer ${token}`,
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(
            {
                CommandID: "CustomerPaybillOnline",
                Amount: amount,
                Msisdn: sender,
                BillRefNumber: "TEST",
                ShortCode: shortCode
            }
        )
    }

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


module.exports = { c2bRequest };