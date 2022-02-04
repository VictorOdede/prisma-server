const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const userData = [
    {
        sacco: "My Sacco",
        email: "mysacco@mail.com",
        businessShortcode: "174379",
        vehicles: {
            create: [
                {
                    registration: "KBZ 111Z",
                    passengers: 14,
                    phone: "254711234567",

                },
                {
                    registration: "KBX 111X",
                    passengers: 14,
                    phone: "254711234568",
                }
            ]
        }
    }
]

const payerData = {
    phone: "254716305157"
}

async function main() {
    let u;
    for (u of userData){
        let user = await prisma.owner.create({
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