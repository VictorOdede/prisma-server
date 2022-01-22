const request = require("request");

function tokenRequest() {
  const options = {
    method: "GET",
    url:
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    headers: {
      Authorization:
        "Basic NGxtQzZQRGpyTjhSaFJqZmRic2lhRzlNdUVsRUhXbjI6ZEx2YnZTeTFLaUdOQmxtOQ==",
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

// call the function and log the results or error
// tokenRequest()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = { tokenRequest };
