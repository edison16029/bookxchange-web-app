import React from "react";
import TabView from '../presentationalComponents/TabView';

import '../../styles/styles.scss';

const YourBooksTab = ({ data, setShowModal, itemOnClick }) => {
  return (
    <TabView 
      data = {data}
      title = {"Your Books"}
      numberOfBooksPerPage = {5} 
      showPagination 
      showButton
      buttonText = {"Add Book"}
      buttonOnClick = {() => { setShowModal(true)}} 
      itemOnClick={itemOnClick} />
  );
};

export default YourBooksTab;
