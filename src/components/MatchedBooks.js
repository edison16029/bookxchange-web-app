import React, { useState } from "react";
import { Layout } from "./presentationalComponents/Layout";
import Button from "./presentationalComponents/Button";
import "../styles/matchedbooks.scss";
import { Menu, Dropdown } from "antd";
import { BellFilled } from "@ant-design/icons";
import { fetchMyAccountData } from "../redux/myAccountSlice";
import { connect } from "react-redux";
import MatchedBooksTab from "./MatchedBooksTab";
import MyBooksTab from "./MyBooksTab";

const pageConstants = {
  activeClassName: "tab-button-active",
  inactiveClassName: "tab-button-inactive",
  accountTabActive: "account-active",
  myBooksTabActive: "my-books-active",
};

const mapDispatchToProps = { fetchMyAccountData };
const MatchedBooks = ({ fetchMyAccountData }) => {
  fetchMyAccountData();
  const [accountButtonClassName, setAccountButtonClassName] = useState(
    pageConstants.activeClassName
  );
  const [myBooksButtonClassName, setMyBooksAccountButtonClassName] = useState(
    pageConstants.inactiveClassName
  );
  const [initallyActive, setInitallyActive] = useState(" initially-active");
  const [activeTab, setActiveTab] = useState(pageConstants.accountTabActive);

  const onAccountClick = () => {
    setInitallyActive("");
    setAccountButtonClassName(pageConstants.activeClassName);
    setMyBooksAccountButtonClassName(pageConstants.inactiveClassName);
    setActiveTab(pageConstants.accountTabActive);
  };

  const menu = (
    <Menu>
      <Menu.ItemGroup title="Mark as Read">
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.alipay.com/"
          >
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.tmall.com/"
          >
            3rd menu item
          </a>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  const onMyBooksClick = () => {
    setInitallyActive("");
    setAccountButtonClassName(pageConstants.inactiveClassName);
    setMyBooksAccountButtonClassName(pageConstants.activeClassName);
    setActiveTab(pageConstants.myBooksTabActive);
  };

  const MatchedBooksBody = () => <MatchedBooksTab />;

  const MyBooksTabBody = () => <MyBooksTab />;
  const Body = () => {
    if (activeTab === pageConstants.accountTabActive)
      return <MatchedBooksBody />;
    else return <MyBooksTabBody />;
  };

  return (
    <Layout>
      <div className="notification-container">
        <Dropdown overlay={menu}>
            <BellFilled className="notification" />
        </Dropdown>
      </div>

      <div className="profile-root-container">
        <div className="tab-bar">
          <Button
            className={accountButtonClassName + initallyActive}
            buttonText="Books you are interested in"
            onClick={onAccountClick}
          />
          <Button
            className={myBooksButtonClassName}
            buttonText="Your books people are interested in"
            onClick={onMyBooksClick}
          />
        </div>
        <div className="tab-body">{Body()}</div>
      </div>
    </Layout>
  );
};

export default connect(null, mapDispatchToProps)(MatchedBooks);
