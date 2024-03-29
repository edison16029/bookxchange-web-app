import React from "react";
import { useHistory } from "react-router-dom";
import { Menu, Dropdown, Button } from "antd";
import { BellFilled } from "@ant-design/icons";
import "../../styles/styles.scss";
import "../../styles/layout.scss";
import "../../styles/ant.scss";
import API from "../../shared/api";
import handleApiError from "../../shared/errorhandler";
import notifyUser from "../../shared/Notification";
import { connect } from "react-redux";
import { updateNotifs } from "../../redux/profileSlice";

const mapStateToProps = (state) => ({
  notifications: state.profile.data.accountInfo.notifications,
  timestamp: state.profile.data.accountInfo.timestamp,
});
const readNotifs = (timestamp, updateNotifs) => {
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
      updateNotifs(response.data.data.newNotifications.notifications);
    })
    .catch((error) => {
      handleApiError(error);
    });
};

const Layout = (props) => {
  const { notifications, timestamp, updateNotifs } = props;
  let newNotifs = notifications === undefined ? [] : notifications;
  let history = useHistory();
  const onNotificationClick = ({ item, key }) => {
    var email = item.props.children[1].match(/\((.*)\)/);
    if (email !== null) {
      window.location.href = `mailto:${email[1]}?subject=Exchanging%20Books`;
    } else {
      history.push("/matchedbooks");
    }
  };

  const menu = (
    <Menu onClick={onNotificationClick}>
      <Menu.ItemGroup title="Notifications">
        {newNotifs.length !== 0 ? (
          notifications.map((value) => (
            <Menu.Item key={value.userId}>{value.text}</Menu.Item>
          ))
        ) : (
          <Menu.Item>{"No New Notifications"}</Menu.Item>
        )}
      </Menu.ItemGroup>
      {newNotifs.length !== 0 ? (
        <Button
          type="secondary"
          style={{ backgroundColor: "#115173", color: "white" }}
          onClick={() => readNotifs(timestamp, updateNotifs)}
        >
          Mark as Read
        </Button>
      ) : null}
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
          <Dropdown overlay={menu} className="cursor-pointer">
            <BellFilled className="notification" />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
export default connect(mapStateToProps, { updateNotifs })(Layout);
