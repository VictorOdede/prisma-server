const { PrismaClient }  = require ('@prisma/client');
const express = require ('express');
const prettyjson = require ('prettyjson');
const mpesaStkCallback = require ('./stk-callback');
const paymentRequest = require('./payment-request');

const prisma = new PrismaClient();
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;


app.get('/', (req, res) => {
    res.send(`Hello world on port ${port}`)
})



// create webhook endpoint to receive webhooks from Safaricom
app.post("/hooks/mpesa", async (req, res) => {
  
    console.log("----Received M-Pesa webhook----");
  
    // format and dump the request payload received from safaricom to the terminal
    console.log(prettyjson.render(req.body, options));

    mpesaStkCallback(req.body); 

  
    // respond to safaricom server with success message
    res.status(200).send();
})



app.post("api/transaction", async (req, res) => {
    console.log("--new transaction--")

    // log the req data
    console.log(prettyjson.render(req.body));

    const {amount, sender, matatu, paybill} = req.body;

    // call mpesa api & send response to client
    if(amount>0){
        paymentRequest(amount, sender, matatu, paybill);
        res.status(202).send();
    }else{
        res.status(400).send();
    }


    // create transaction item on prisma
    const newTransaction = await prisma.transaction.create({
        data: {
            amount,
            sender,
            matatu,
            paybill,
        }
    })
    res.json(newTransaction);    
})

// update prisma transaction item
app.put('api/transaction/:id', async (req, res) => {
    const { id } = req.params
    const transaction = await prisma.transaction.update({
      where: { id },
      data: { success: true },
    })
    res.json(transaction);
})


app.listen(port, () => {
    try{
        console.log(`Listening on port ${port} `)
    } 
    catch(err){
        console.log(err)
    }
})