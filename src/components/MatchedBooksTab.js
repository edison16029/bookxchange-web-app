import React, { useState } from "react";
import { connect } from "react-redux";
import { List, Modal, Button, Typography } from "antd";
import "../styles/matchedbooks.scss";
const { Title, Text } = Typography;
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const mapStateToProps = (state) => ({
  myAccount: state.myAccount,
});

const MatchedBooksTab = ({ myAccount }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="accounttab-container">
      <Title level={2} className="align-center">Books you are interested in</Title>
      <List
        size="large"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Button type="link" block onClick={showModal}>
              {item.title}
            </Button>
            <Modal
              title="Book Details"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              centered
              footer={[
                <Button key="submit" type="primary" onClick={handleOk}>
                  Remove book from interested books
                </Button>,
              ]}
            >
              <div className="modal-container">
              <div className="align-center">
                <Title level={5}>Name</Title>
                  <Text keyboard>Ant Design (keyboard)</Text>
                </div>
                <div className="align-center">
                <Title level={5}>Author</Title>
                  <Text keyboard>Ant Design (keyboard)</Text>
                </div>
                <div className="align-center">
                <Title level={5}>Owner</Title>
                  <Text keyboard>Ant Design (keyboard)</Text>
                </div>
              </div>
            </Modal>
          </List.Item>
        )}
      />
    </div>
  );
};

export default connect(mapStateToProps, null)(MatchedBooksTab);
