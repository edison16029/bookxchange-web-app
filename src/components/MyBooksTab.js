import React, { useState } from "react";
import { connect } from "react-redux";
import { List, Modal, Button, Typography } from "antd";
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

const MyBooksTab = ({ myAccount }) => {
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
      <Title level={2} className="align-center">
        Your books people are interested in
      </Title>
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
                  <Text keyboard>Book Name</Text>
                </div>
                <div className="align-center">
                  <Title level={2}>Interested People</Title>
                  <List
                    grid={{ gutter: 20, column:2 }}
                    dataSource={data}
                    renderItem={(item) => (
                      <List.Item>
                       {item.title}
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </Modal>
          </List.Item>
        )}
      />
    </div>
  );
};

export default connect(mapStateToProps, null)(MyBooksTab);
