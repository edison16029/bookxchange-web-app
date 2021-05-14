import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { BellFilled } from "@ant-design/icons";
import "../../styles/layout.scss";
import "../../styles/ant.scss";
import API from "../../shared/api";
import handleApiError from "../../shared/errorhandler";
import notifyUser from "../../shared/Notification";
import { connect } from "react-redux";
import { updateNotifs } from "../../redux/myAccountSlice";

const mapStateToProps = (state) => ({
  notifications: state.myAccount.data.notifications,
  timestamp: state.myAccount.data.timestamp,
});
const readNotifs = (timestamp,update) => {
  const requestBody = {
    timestamp: timestamp,
  };
  const myApi = new API();
  myApi.endpoints.users
    .readNotifications(requestBody)
    .then((response) => {
      notifyUser(
        "success",
        "Notifications cleared!",
        "Notifications have been marked as read."
      );
      update(response.data.data.newNotifications.notifications);
    })
    .catch((error) => {
      console.log(error)
      handleApiError(error);
    });
};
const Layout = (props) => {
  const { notifications, timestamp,updateNotifs } = props;
  console.log(props);
  let newNotifs = notifications === undefined ? [] : notifications;
  const menu = (
    <Menu>
      {newNotifs.length !== 0 ? (
        <Button onClick={() => readNotifs(timestamp,updateNotifs)}>Mark as Read</Button>
      ) : (
        <Button disabled>Mark as Read</Button>
      )}

      <Menu.ItemGroup title="Notifications">
        {newNotifs.length !== 0 ? (
          notifications.map((value) => <Menu.Item>{value.text}</Menu.Item>)
        ) : (
          <div>No New Notifications</div>
        )}
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <div className="full-container">
      <div className="mini-container" />
      <div className="layout-container">
        <div className="layout-inner-container">{props.children}</div>
      </div>
      <div className="mini-container">
        <div className="notification-container">
          <Dropdown overlay={menu}>
            <BellFilled className="notification" />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
export default connect(mapStateToProps, { updateNotifs})(Layout);
