import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'antd';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../utils/queries';
const { Meta } = Card;

function Profile() {


   const { data } = useQuery(QUERY_USER);
   console.log(data);
   let user;

   if (data) {
      user = data.user;
   }


   return (
      <>
         <div className="container">
            {user ? (
               <>
                  <h2>Order History for {user.firstName} {user.lastName}</h2>
                  {user.orders.map((order) => (
                     <div key={order._id}>
                        <h3>Date Ordered: {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                        <div className="flex-row">
                           {order.listings.map(({ _id, image, name, price }, index) => (
                              <Card
                                 hoverable
                                 style={{ width: 240 }}
                                 cover={<img alt="example" src="https://via.placeholder.com/150C/O%20https://placeholder.com/" />}
                              >
                                 <Meta title="ProductName" description={() => {
                                    return (
                                       <div key={index}>
                                          <Link to={`/listings/${_id}`}>
                                             <img
                                                alt={name}
                                                src={`/images/${image}`}
                                             />
                                             <p>{name}</p>
                                          </Link>
                                          <div>
                                             <span>${price}</span>
                                          </div>
                                       </div>
                                    );
                                 }
                                 } className="product-card" />
                              </Card>
                           ))}
                        </div>
                     </div>
                  ))}
               </>
            ) : (
                  <>
                     Yikes, it looks like you haven't ordered anything. You can fix that here:
                     <Link to="/">
                        <p>← Back to listings</p>
                     </Link>
                  </>
               )}

         </div>

      </>)
};

export default Profile;