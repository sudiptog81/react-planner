import React from "react";
import moment from "moment";

const Notifications = props => {
  const { notifications } = props;
  return (
    <div className="section">
      <div className="card">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title ">Notifications</span>
          <ul className="notifications">
            {notifications &&
              notifications.map(item => {
                return (
                  <li key={item.id}>
                    <div>
                      <span className="blue-text text-darken-3">
                        {item.user}
                      </span>
                      &nbsp;
                      <span className="">{item.content}</span>
                      <div className="grey-text note-date">
                        {moment(item.time.toDate()).fromNow()}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
