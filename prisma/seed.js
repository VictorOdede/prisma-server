const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const userData = [
    {
        businessName: "My Business",
        email: "mybusiness@mail.com",
        phone: "0716305157",
        accountType: "m-pesa",
        accountNumber: "0716305157",   
    }
]

const payerData = {
    firstName: "Victor",
    lastName: "Odede",
    phone: "254716305157"
}

async function main() {
    let u;
    for (u of userData){
        let user = await prisma.business.create({
            data: u
        })
        console.log(`created user with id: ${user.id}`)
    }

    // let payingUser = await prisma.payer.create({
    //     data: payerData
    // })  
    // console.log(`${payingUser.id}`);
}

main().catch((err) => {
    console.error(err)
}).finally(async () => {
    await prisma.$disconnect()
})