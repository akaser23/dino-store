import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
   const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const listings = cart.map(item => item._id);

      console.log (cart);
      console.log(listings);
      
      if (listings.length) {
        const { data } = await addOrder({ variables: { listings } });
        const listingData = data.addOrder.listings;
        console.log(data);
        console.log(listingData);
    
        listingData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }
        
      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

   return (
      <div>
         <section className="jumbotron">
            <h1>Success!</h1>
            <h2>Thank you for your purchase!</h2>
            <h2>You will now be redirected to the homepage</h2>
         </section>
      </div>
   );
};

export default Success;