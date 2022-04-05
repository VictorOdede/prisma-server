const { tokenRequest } = require("./token-request");
const { mpesaRequest } = require("./mpesa-request");
const dotenv = require("dotenv");
const { PrismaClient }  = require ('@prisma/client');

const prisma = new PrismaClient();

dotenv.config();

// Use async function to allow time to resolve
async function paymentRequest(sent_amount, sender_number, account_name) {
  
  const apiKey = process.env.MPESA_API_KEY;
  const apiSecret = process.env.MPESA_API_SECRET;


  // Wait for token to resolve 
  const newToken = await tokenRequest(apiKey, apiSecret);

  // Call the mpesa payment request and pass the access token
  const myRequest = await mpesaRequest(newToken, sent_amount, sender_number, account_name);

  // sort the return data from mpesa API                      
  console.log(myRequest);

  // request transaction status
  const sender_number_str = sender_number.toString();
  // const sender_number_str = "0716305158";

  var numberExist;
  
  //query to see if sender_number exists in db 
  numberExist = await prisma.payer.findUnique({
    where: {
      phone: sender_number_str,
    },
    select: {
      phone: true,
    }
  })

  console.log(numberExist)

  if (numberExist === null){
  // add number to db
  const newPayer = await prisma.payer.create({data:
    {
      phone: sender_number_str
  },
  select: {
    phone: true
  }
})
  console.log(newPayer);
  }

  // if transaction is successful, send text message to business number
  // await sendMessage(matatu_phone, sent_amount, sender_number);

}


module.exports = { paymentRequest };
