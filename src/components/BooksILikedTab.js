import React from "react";
import TabView from './presentationalComponents/TabView';

import '../styles/styles.scss';

const BooksILikedTab = ({ data }) => {
  return (
    <TabView 
      data = {data}
      title = {"Books you are interested in"}
      numberOfBooksPerPage = {5} />
  );
};

export default BooksILikedTab;
