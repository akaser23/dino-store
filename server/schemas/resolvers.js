const { AuthenticationError } = require('apollo-server-express');
const { User, Listing, Order } = require('../models');


const resolvers = {
    Query: {
        users: async () => {
            const users = await User.find();

            console.log(users);
            return users;
        }
    }
}


module.exports = resolvers;