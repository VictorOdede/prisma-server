const { PrismaClient }  = require ('@prisma/client');
const {formatMpesaStkObject} = require('./format-stk');
const {transactionStatus} = require('./transactionStatus');

const prisma = new PrismaClient();

    
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