const AfricasTalking = require('africastalking');
const dotenv = require('dotenv');
dotenv.config();

const credentials = { 
    apiKey: process.env.APIKEY, 
    username: process.env.USERNAME
}

// Initialize Africa's Talking
const africastalking = AfricasTalking(credentials);
  
  
async function sendMessage(matatuPhone, sentAmount, senderNumber) {
      // TODO: Send message
      try {
    const result=await africastalking.SMS.send({
      to: matatuPhone, // matatu phone number in string with 254 prefix
      message: `Transaction successful. You have received Ksh.${sentAmount} from ${senderNumber}`
      
    });
    console.log(result);
  } catch(err) {
    console.error(err);
  }};
  
module.exports = { sendMessage }

  

