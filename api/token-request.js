const request = require("request");
const btoa = require('btoa');
const aapiKey = "lOvvrMYakdRMhGSybKifDSXCoQM52yYp";
const aapiSecret = "Jpju9EdhuYu1GTkb";

async function tokenRequest(apiKey, apiSecret) {
  

  const auth ="Basic " + btoa(`${apiKey}:${apiSecret}`);



  const options = {
    method: "GET",
    url:
      " https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    headers: {
      Authorization: auth
    },
  };


  // Return promise to wait for the token to be downloaded
  return new Promise(function (resolve, reject) {
    request(options, function (error, response) {
      // if an error occurs pass it to reject()
      if (error) {
        reject(error);
        console.log("error");
      }
      // Response is returned using the resolve()
      const myToken = JSON.parse(response.body).access_token;
      resolve(myToken);

    });
  });
}

// tokenRequest(aapiKey, aapiSecret);

// call the function and log the results or error
// tokenRequest(aapiKey, aapiSecret)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = { tokenRequest };
