const { AuthenticationError } = require('apollo-server-express');
const { User, Listing, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');


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
                params. category = category;
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
        }
    }
};


module.exports = resolvers;