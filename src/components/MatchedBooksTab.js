import React from "react";
import { connect } from "react-redux";
import { List} from "antd";
import "../styles/accounttab.scss"
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
  return (
    <div className="accounttab-container">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
      </div>
  );
};

export default connect(mapStateToProps, null)(MatchedBooksTab);
