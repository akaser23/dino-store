const db = require('./connection');
const { User, Listing, Order} = require('../models');

db.once('open', async () => {
    
    await Listing.deleteMany();

    const listings = await Listing.insertMany([
        {
            name: 'Socks',
            description: 'A pair of socks, only worn a couple times.',
            image: 'socks.jpg',
            price: 15.99,
            quantity: 1
        },
        {
            name: 'Socks',
            description: 'A pair of socks, only worn a couple times.',
            image: 'socks.jpg',
            price: 15.99,
            quantity: 1
        },
        {
            name: 'Socks',
            description: 'A pair of socks, only worn a couple times.',
            image: 'socks.jpg',
            price: 15.99,
            quantity: 1
        },
        {
            name: 'Socks',
            description: 'A pair of socks, only worn a couple times.',
            image: 'socks.jpg',
            price: 15.99,
            quantity: 1
        },
        {
            name: 'Socks',
            description: 'A pair of socks, only worn a couple times.',
            image: 'socks.jpg',
            price: 15.99,
            quantity: 1
        },{
            name: 'Socks',
            description: 'A pair of socks, only worn a couple times.',
            image: 'socks.jpg',
            price: 15.99,
            quantity: 1
        },{
            name: 'Socks',
            description: 'A pair of socks, only worn a couple times.',
            image: 'socks.jpg',
            price: 15.99,
            quantity: 1
        },{
            name: 'Socks',
            description: 'A pair of socks, only worn a couple times.',
            image: 'socks.jpg',
            price: 15.99,
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
        }
    );

    console.log('users seeded');

    process.exit();
});