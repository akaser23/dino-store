import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import ListingItem from "../ListingItem";
import { QUERY_LISTINGS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_LISTINGS } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
// import { Pagination } from 'antd';

function Listings() {
    const [state, dispatch] = useStoreContext();
  
    const { currentCategory } = state;
    
    const { loading, data } = useQuery(QUERY_LISTINGS);
    console.log(data);
    useEffect(() => {
      
      if(data) {
        dispatch({
          type: UPDATE_LISTINGS,
          listings: data.listings
        });
        
        data.listings.forEach((listing) => {
          idbPromise('listings', 'put', listing);
        });
        // add else if to check if `loading` is undefined in `useQuery()` Hook
      } else if (!loading) {
        // since we're offline, get all of the data from the `products` store
        idbPromise('listings', 'get').then((listings) => {
          // use retrieved data to set global state for offline browsing
          dispatch({
            type: UPDATE_LISTINGS,
            listings: listings
          });
        });
      }
    }, [data, loading, dispatch]);
    
    function filterListings() {
      if (!currentCategory) {
        return state.listings;
      }
    
      return state.listings.filter(listing => listing.category._id === currentCategory);
    }
  
    return (
      <div className="my-2">
        <h2>Our Listings:</h2>
        {state.listings.length ? (
          <div className="flex-row">
              {filterListings().map(listing => (
                  <ListingItem
                    key= {listing._id}
                    _id={listing._id}
                    image={listing.image}
                    name={listing.name}
                    price={listing.price}
                    quantity={listing.quantity}
                  />
              ))}
          </div>
        ) : (
          <h3>No current listings.</h3>
        )}
        { loading ? 
        <img src={spinner} alt="loading" />: null}
        {/* <Pagination defaultCurrent={1} total={50} /> */}
      </div>
    );
  }
  
  export default Listings;