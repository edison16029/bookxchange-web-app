import React from "react";
import TabView from '../presentationalComponents/TabView';

import '../../styles/styles.scss';

const YourBooksTab = ({ data }) => {
  return (
    <TabView 
      data = {data}
      title = {"Your Books"}
      numberOfBooksPerPage = {5} 
      showPagination 
      showButton
      buttonText = {"Add Book"}/>
  );
};

export default YourBooksTab;
