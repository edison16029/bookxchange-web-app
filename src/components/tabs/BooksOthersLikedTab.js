import React from "react";
import TabView from '../presentationalComponents/TabView';

import '../../styles/styles.scss';

const BooksOthersLikedTab = ({ data, itemOnClick }) => {
  return (
    <TabView 
      data = {data}
      title = {"Your books people are interested in"}
      numberOfBooksPerPage = {5} 
      showPagination
      itemOnClick={itemOnClick} />
  );
};

export default BooksOthersLikedTab;
