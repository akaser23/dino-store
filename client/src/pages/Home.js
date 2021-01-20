import React from "react";
import ListingList from "../components/ListingList";
import CategoryMenu from "../components/CategoryMenu";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ListingList />
    </div>
  );
};

export default Home;