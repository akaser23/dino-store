import React from 'react'

import dino from '../../assets/dino.svg';
import './style.css';

function Header() {
   return (
      <header>
         <div>
            <h1>Din<img src={dino} />store</h1>
         </div>
         <div> 
            Shopping Cart
         </div>
      </header>
   )
}

export default Header;