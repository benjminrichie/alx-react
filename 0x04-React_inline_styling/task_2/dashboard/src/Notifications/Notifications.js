import React from "react";
// import "./Notifications.css";
import closeIcon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropeTypes from "prop-types";
import NotificationItemShape from "./NotificationItemShape";
import { StyleSheet, css } from "aphrodite";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.listNotifications.length > this.props.listNotifications.length
    );
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    return (
      <>
        <div className={css(notificationStyles.menuItem)}>Your notifications</div>
        {this.props.displayDrawer ? (
          <div className={css(notificationStyles.nofificatons)}>
            <button
              style={{
                color: "#3a3a3a",
                fontWeight: "bold",
                background: "none",
                border: "none",
                fontSize: "15px",
                position: "absolute",
                right: "3px",
                top: "3px",
                cursor: "pointer",
                outline: "none",
              }}
              aria-label="Close"
              onClick={(e) => {
                console.log("Close button has been clicked");
              }}
            >
              <img src={closeIcon} alt="close icon" width="15px" />
            </button>
            {this.props.listNotifications.length != 0 ? (
              <p>Here is the list of notifications</p>
            ) : null}
            <ul>
              {this.props.listNotifications.length == 0 ? (
                <NotificationItem
                  type="default"
                  value="No new notification for now"
                />
              ) : null}
              {this.props.listNotifications.map((val, idx) => {
                return (
                  <NotificationItem
                    type={val.type}
                    value={val.value}
                    html={val.html}
                    key={val.id}
                    markAsRead={this.markAsRead}
                    id={val.id}
                  />
                );
              })}
            </ul>
          </div>
        ) : null}
      </>
    );
  }
}

const notificationStyles = StyleSheet.create({
  nofificatons: {
    border: "3px dotted #e1484c",
    padding: "6px 12px",
    position: "absolute",
    top: "21px",
    right: "7px",
    marginTop: "12px",
    zIndex: 100,
  },
  menuItem: {
    position: "absolute",
    top: "7px",
    right: "7px",
  },
});

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

Notifications.propTypes = {
  displayDrawer: PropeTypes.bool,
  listNotifications: PropeTypes.arrayOf(NotificationItemShape),
};

export default Notifications;
