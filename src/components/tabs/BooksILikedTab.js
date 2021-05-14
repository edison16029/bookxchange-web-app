import React from "react";
import TabView from '../presentationalComponents/TabView';

import '../../styles/styles.scss';

const BooksILikedTab = ({ data, itemOnClick }) => {
  return (
    <TabView 
      data = {data}
      title = {"Books you liked"}
      numberOfBooksPerPage = {5} 
      showPagination
      itemOnClick={itemOnClick} />
  );
};

export default BooksILikedTab;
