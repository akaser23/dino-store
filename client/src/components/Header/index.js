import React from 'react'
import Cart from '../Cart';

import dino from '../../assets/dino.svg';
import './style.css';

function Header() {
   return (
      <header>
         <div>
            <h1 className="site-logo">Din<img className="logo-img" src={dino} alt="Dinostore Logo"/>store</h1>
         </div>
         <div className="cart-icon"> 
            <Cart />
         </div>
      </header>
   )
}

export default Header;