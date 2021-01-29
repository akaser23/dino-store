import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'antd';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../utils/queries';
const { Meta } = Card;

function Profile() {


   const { data } = useQuery(QUERY_USER);
   let user;

   if (data) {
      user = data.user;
   }


   return (
      <>
         <div className="profile-container">
            {user ? (
               <div>
                  <h2>Order History for {user.firstName} {user.lastName}:</h2>
                  <div>
                  {user.orders.map((order) => (
                     <div key={order._id}>
                        <h3>Date Ordered: {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                        <div>
                           <ul className="orders-list">
                              {order.listings.map(({ _id, image, name, price }, index) => (
                                 <li key={index}>
                                    <Link to={`/listings/${_id}`}>
                                       <Card
                                          hoverable
                                          style={{ width: 240 }}
                                          cover={<img alt="example" src={`images/${image}`} />}
                                       >
                                          <Meta title={name} description={(
                                             <div>
                                                <div>
                                                   <span>${price}</span>
                                                </div>
                                             </div>)
                                          } className="product-card" />
                                       </Card>
                                    </Link>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>
                  ))}
                  </div>
               </div>
            ) : (
                  <div className="blank-orders">
                     Yikes, it looks like you haven't ordered anything. You can fix that here:
                     <Link to="/">
                        <p>← Back to listings</p>
                     </Link>
                  </div>
               )}

         </div>

      </>)
};

export default Profile;