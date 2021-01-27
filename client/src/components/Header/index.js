import React from 'react'
import Cart from '../Cart';
import Nav from '../Nav';

import dino from '../../assets/dino.svg';
import './style.css';
import { Link } from 'react-router-dom';

function Header() {
   return (
      <header>
         <div className="header-top">
            <div>
               <Link to='/'>
                  <h1 className="site-logo" title="DinoStore">Din<img className="logo-img" src={dino} alt="Dinostore Logo" />store</h1>
               </Link>
            </div>
            <div className="cart-icon">
               <Cart />
            </div>
         </div>
         <Nav />
      </header>
   )
}

export default Header;