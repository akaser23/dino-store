import React from "react";
import CategoryMenu from "../components/CategoryMenu";
import Listings from '../components/Listings';

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <Listings/>
    </div>
  );
};

export default Home;