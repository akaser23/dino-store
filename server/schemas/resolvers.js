const { AuthenticationError } = require('apollo-server-express');
const { User, Listing, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');



const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        users: async () => {
            const users = await User.find();
            return users;
        },
        listings: async (parent, { category, name }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                    $regex: name
                };
            }

            return await
                Listing.find(params).populate('category');
        },
        listing: async (parent, { _id }) => {
            return await Listing.findById(_id);
        },
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                });

                return user.orders.id(_id);
            }

            throw new AuthenticationError('Not logged in');
        },
        checkout: async (parent, args, context) => {
            const order = new Order({ listings: args.listings });
            const { listings } = await order.populate('listing').execPopulate();
            const url = new URL(context.headers.referer).origin;
            const line_items = [];

            for (let i = 0; i < listings.length; i++) {
                // generate product id
                const listing = await stripe.listings.create({
                    name: listings[i].name,
                    description: listings[i].description,
                    images: [`${url}/images/${listings[i].image}`]
                });

                // generate price id using the product id
                const price = await stripe.prices.create({
                    listing: listing.id,
                    unit_amount: listings[i].price * 100,
                    currency: 'usd',
                });

                // add price id to the line items array
                line_items.push({
                    price: price.id,
                    quantity: 1
                });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return { session: session.id };
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        updateListing: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;

            return await Listing.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },
        addOrder: async (parent, { listings }, context) => {
            if (context.user) {
                const order = new Order({ listings });

                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

                return order;
            }

            throw new AuthenticationError('Not logged in');
        },
    }
};


module.exports = resolvers;