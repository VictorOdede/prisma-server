const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const userData = [
    {
        sacco: "My Sacco",
        email: "mysacco@mail.com",
        paybill: 12345,
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

async function main() {
    let u;
    for (u of userData){
        let user = await prisma.user.create({
            data: u
        })
        console.log(`created user with id: ${user.id}`)
    }  
}

main().catch((err) => {
    console.error(err)
}).finally(async () => {
    await prisma.$disconnect()
})