const { PrismaClient }  = require ('@prisma/client');
const {formatMpesaStkObject} = require('./format-stk');
const {transactionStatus} = require('./transactionStatus');
// const {business_id} = require('./payment-request');


const prisma = new PrismaClient();
const business_id = "965482e4-73a8-4fb7-9199-d622aff9fc9e"
    
const mpesaStkCallback = async (data, businessID) => {

  // Destructure data variables
  let {
      ResultCode,
      CheckoutRequestID,
      MerchantRequestID
    } = data.Body.stkCallback;

    
    // Check if payment is successful
  if (ResultCode === 0) {
  const status = await transactionStatus(CheckoutRequestID);
  console.log(status);
    
    // Format mpesaStk webhook data
    const mpesaObj = await formatMpesaStkObject({ data });
    console.log(mpesaObj);

    const {Amount, PhoneNumber, MpesaReceiptNumber} = mpesaObj;

    const amount_str = Amount.toString();
    const phone_str = `${PhoneNumber}`;

     //mutate prisma db
    const newTransaction = await prisma.transaction.create({data:
      {
        amount: amount_str,
        senderNumber: phone_str,
        recepientID: businessID,
        transactionID: MpesaReceiptNumber,
        success: true
    }})

    console.log(newTransaction);




    return mpesaObj; 
    
  } 
  

} 

module.exports = {mpesaStkCallback}