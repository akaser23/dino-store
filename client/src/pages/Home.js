import React from "react";
import Listings from "../components/Listings";
import CategoryMenu from "../components/CategoryMenu";

const Home = () => {
  return (
    <div className="home-container">
      <div>
        <CategoryMenu />
        <Listings />
      </div>
    </div>
  );
};

export default Home;