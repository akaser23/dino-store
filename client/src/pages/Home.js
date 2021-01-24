import React from "react";
import Listings from "../components/Listings";
import CategoryMenu from "../components/CategoryMenu";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <Listings />
    </div>
  );
};

export default Home;