import React, { useState } from "react";
import { connect } from "react-redux";
import { List, Modal, Button, Typography } from "antd";
import { Pagination } from 'antd';
import TextItem from './presentationalComponents/TextItem';
import TabView from './presentationalComponents/TabView';

import '../styles/styles.scss';
import "../styles/matchedbooks.scss";
const { Title, Text } = Typography;


const mapStateToProps = (state) => ({
  myAccount: state.myAccount,
});

const MatchedBooksTab = ({ myAccount }) => {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const showModal = () => {
  //   setIsModalVisible(true);
  // };
  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  const data = [];
  for(var i = 0; i< 48; i++){
    data.push({title : "Hello " + i})
  }

  return (
    <TabView 
      data = {data}
      title = {"Books you are interested in"}
      numberOfBooksPerPage = {5} />
  );
};

export default connect(mapStateToProps, null)(MatchedBooksTab);
