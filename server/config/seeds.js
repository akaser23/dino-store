const db = require('./connection');
const { User, Listing, Category, Order } = require('../models');

db.once('open', async () => {
    await Category.deleteMany();

    const categories = await Category.insertMany([
        { name: 'Clothing & Apparel' },
        { name: 'Home & Garden' },
        { name: 'Vehicles' },
        { name: 'Books' },
        { name: 'Toys' },
        { name: 'Food' }
    ]);

    console.log('categories seeded');

    await Listing.deleteMany();

    const listings = await Listing.insertMany([
        {
            name: 'Dino Socks',
            description: 'A pair of socks, only worn a couple times.',
            image: 'socks.jpg',
            category: categories[0]._id,
            price: 15.99,
            quantity: 1
        },
        {
            name: 'Dino Bed',
            description: 'A bed Rawrrrrr.',
            image: 'bed.jpg',
            category: categories[1]._id,
            price: 55.99,
            quantity: 1
        },
        {
            name: 'Dino Car',
            description: 'A car for you and your dino',
            image: 'car.jpg',
            category: categories[2]._id,
            price: 1500.99,
            quantity: 1
        },
        {
            name: 'Dino Shirt',
            description: 'A shirt with a dino on it.',
            image: 'shirt.jpg',
            category: categories[0]._id,
            price: 20.99,
            quantity: 1
        },
        {
            name: 'Dino Ball',
            description: 'A soccer ball for T-Rex7.',
            image: 'ball.jpg',
            category: categories[4]._id,
            price: 25.99,
            quantity: 1
        }, {
            name: 'Dino Plate',
            description: 'Enjoy eating off of your dino plate',
            image: 'plate.jpg',
            category: categories[5]._id,
            price: 10.99,
            quantity: 1
        }, {
            name: 'Dino Book',
            description: 'Read your favorite Valentine, a dino book!',
            image: 'book.jpg',
            category: categories[3]._id,
            price: 7.99,
            quantity: 1
        }, {
            name: 'Dino Encyclopedia',
            description: 'Marvel with the pop-up dino encyclopedia!',
            image: 'encyc.jpg',
            category: categories[3]._id,
            price: 19.99,
            quantity: 1
        }, {
            name: 'Dino Waffle Iron',
            description: "What's for breakfast? Waffle-shaped dinosaurs!",
            image: 'waffles.jpg',
            category: categories[1]._id,
            price: 44.99,
            quantity: 1
        }, {
            name: 'Dino Race Track',
            description: 'Race your favorite toy car on this dino race track!',
            image: 'racetrack.jpg',
            category: categories[2]._id,
            price: 27.99,
            quantity: 1
        }, {
            name: 'Dino Jumpsuit',
            description: 'Go to every outing, roaring!',
            image: 'jumpsuit.jpg',
            category: categories[0]._id,
            price: 32.99,
            quantity: 1
        }, {
            name: 'Dino Statue',
            description: 'Scare the neighbors away with this dino statue!',
            image: 'statue.jpg',
            category: categories[1]._id,
            price: 154.99,
            quantity: 1
        }, {
            name: 'Dino Ride',
            description: 'Get ready to ride a dino!',
            image: 'dinoride.jpg',
            category: categories[2]._id,
            price: 99.99,
            quantity: 1
        }, {
            name: 'Dino Textbook',
            description: "Learn the A-Z's about dinos!",
            image: 'textbook.jpg',
            category: categories[3]._id,
            price: 75.99,
            quantity: 1
        }, {
            name: 'Dino Lego',
            description: 'Build a dino of your own!',
            image: 'lego.jpg',
            category: categories[4]._id,
            price: 12.99,
            quantity: 1
        }, {
            name: 'Dino Candy',
            description: 'Enjoy these dino candies!',
            image: 'candy.jpg',
            category: categories[5]._id,
            price: 2.99,
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