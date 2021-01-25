import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './style.css'

function Nav() {

   function showNavigation() {
      if (Auth.loggedIn()) {
         return (
            <>
               <Link to="/Profile">
                  Order History
               </Link>
               <a href="/" onClick={() => Auth.logout()}>
                  Logout
               </a>
            </>
         );
      } else {
         return (
            <>
               <Link to="/signup">
                  Signup
               </Link>
               <Link to="/login">
                  Login
               </Link>
               <Link to="/Profile">
                  Order History
               </Link>
               <a href="/" onClick={() => Auth.logout()}>
                  Logout
               </a>
            </>
         );
      }
   }

   return (
      <nav className='header-nav'>
         {showNavigation()}
      </nav>
   );
}

export default Nav;