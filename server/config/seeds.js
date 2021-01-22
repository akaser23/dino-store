const db = require('./connection');
const { User, Listing, Order} = require('../models');

db.once('open', async () => {
    
    await Listing.deleteMany();

    const listings = await Listing.insertMany([
        {
            name: 'Dino Socks',
            description: 'A pair of socks, only worn a couple times.',
            image: 'socks.jpg',
            price: 15.99,
            quantity: 1
        },
        {
            name: 'Dino Bed',
            description: 'A bed Rawrrrrr.',
            image: 'bed.jpg',
            price: 55.99,
            quantity: 1
        },
        {
            name: 'Dino Car',
            description: 'A car for you and your dino',
            image: 'car.jpg',
            price: 1500.99,
            quantity: 1
        },
        {
            name: 'Dino Shirt',
            description: 'A shirt with a dino on it.',
            image: 'shirt.jpg',
            price: 20.99,
            quantity: 1
        },
        {
            name: 'Dino Balls',
            description: 'A Basketball and football with dinos.',
            image: 'balls.jpg',
            price: 25.99,
            quantity: 1
        },{
            name: 'Dino Plate',
            description: 'Enjoy eating off of your dino plate',
            image: 'plate.jpg',
            price: 10.99,
            quantity: 1
        }
    ]);

    console.log('listings seeded');

    await User.deleteMany();

    await User.create(
        {
            firstName: 'New',
            lastName: 'User',
            email: 'newuser123@gmail.com',
            password: 'password1234'
        },
        {
            firstName: 'New1',
            lastName: 'User1',
            email: 'newuser1234@gmail.com',
            password: 'password1234'
        },
        {
            firstName: 'New2',
            lastName: 'User2',
            email: 'newuser12345@gmail.com',
            password: 'password1234'
        },
        {
            firstName: 'New3',
            lastName: 'User3',
            email: 'newuser123456@gmail.com',
            password: 'password1234'
        }
    );

    console.log('users seeded');

    process.exit();
});