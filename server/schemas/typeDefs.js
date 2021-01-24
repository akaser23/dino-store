const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Category {
        _id: ID
        name: String
    }

    type Listing {
        _id: ID
        name: String
        description: String
        image: String
        quantity: Int
        price: Float
        category: Category
    }

    type Order {
        _id: ID
        purchaseDate: String
        listings: [Listing]
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        listings: [Listing]
        # orders: [Order]
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        categories: [Category]
        users: [User]
        listings: [Listing]
        listing(_id: ID!): Listing
        # order(_id: ID!): Order
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;