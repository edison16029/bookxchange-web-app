import React from "react";
import TabView from '../presentationalComponents/TabView';

import '../../styles/styles.scss';

const AccountTab = ({ data }) => {
  return (
    <TabView 
      data = {data}
      title = {"Account Information"}
      numberOfBooksPerPage = {5} />
  );
};

export default AccountTab;
