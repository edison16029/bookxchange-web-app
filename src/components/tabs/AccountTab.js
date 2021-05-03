import React from "react";
import TabView from '../presentationalComponents/TabView';
import { useState } from 'react'

import '../../styles/styles.scss';

const AccountTab = ({ data, setShowModal }) => {
  return (
    <TabView 
      data = {data}
      title = {"Account Information"}
      numberOfBooksPerPage = {5} 
      showButton
      buttonText = {"Update Profile"}
      buttonOnClick = {() => { setShowModal(true)}}/>
  );
};

export default AccountTab;
