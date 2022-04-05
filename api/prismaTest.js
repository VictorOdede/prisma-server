const { PrismaClient }  = require ('@prisma/client');

const prisma = new PrismaClient();


var numberExist;

const prismaTest = async() => {

//query to see if sender_number exists in db 
numberExist = await prisma.payer.findUnique({
where: {
    phone: "0716305157",
}
})

return numberExist;
}

prismaTest().then((result)=>{
    console.log(result)

}).catch((err)=>{
    console.log(err)
})
