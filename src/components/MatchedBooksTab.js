import React,{ useState } from "react";
import { connect } from "react-redux";
import { List,Modal,Button} from "antd";
import "../styles/matchedbooks.scss"
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
          <List
          size="large"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Button type="link" block onClick={showModal}>{item.title}</Button>
                <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
              </List.Item>
            )}
          />
      </div>
  );
};

export default connect(mapStateToProps, null)(MatchedBooksTab);
