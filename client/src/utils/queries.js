import gql from 'graphql-tag';

export const QUERY_LISTINGS = gql`
query getListings($category: ID) {
    listings(category: $category) {
        _id
        name
        description
        price
        quantity
        listingTime
        category {
            _id
        }
    }
}
`;

export const QUERY_ALL_LISTINGS = gql`
    {
        listings {
            _id
            name
            description
            price
            quantity
            listingTime
            category {
                name
            }
        }
    }
`;

export const QUERY_CATEGORIES = gql`
{
    categories {
        _id
        name
    }
}
`;

export const QUERY_USER = gql`
{
    user {
        firstName
        lastName
        email
        orders {
            _id
            purchaseDate
            listings {
            _id
            name
            description
            price
            quantity
            listingTime
            }
        }
    }
}
`;

export const QUERY_CHECKOUT = gql`
query getCheckout($listings: [ID]!) {
    checkout(listings: $listings) {
        session
    }
}
`;
