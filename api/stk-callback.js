
const {formatMpesaStkObject} = require('./format-stk');

// const myTestData = {Body:{
//                     stkCallback:{
//                                 MerchantRequestID: 16047-10036463-1,
//                                 CheckoutRequestID: 'ws_CO_230220210947472910',
//                                 ResultCode:        0,
//                                 ResultDesc:        'The service request is processed successfully'}}};

    
const mpesaStkCallback = async data => {

    // Destructure data variables
    let {
        ResultCode,
        CheckoutRequestID,
        MerchantRequestID
      } = data.Body.stkCallback;
  
      
      // If payment is successful
      if (ResultCode === 0) {
        
        // Format mpesaStk webhook data
        const mpesaObj = await formatMpesaStkObject({ data });
        return mpesaObj;
       
        // console.log(mpesaObj);
        
      } else (
        console.log(error)
      )
  

} 

module.exports = {mpesaStkCallback}