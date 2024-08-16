import React from "react";
import { Link, useRouteLoaderData } from "react-router-dom";

export default function NotificationItemComponent({ notifications }) {
  if (!notifications || notifications.length === 0) {
    return <div>Loading</div>;
  }

  return (
    <div className="overflow-y-auto max-h-96">
      {notifications.map((notification) => {
        let linkTo = "/home/clients/meeting";
        if (notification.title === "Task Status Updated!") {
          linkTo = "/home/projects";
        }

        return (
          <div
            key={notification.id}
            className="text-ba bg-shade mt-1 block w-full p-4 rounded-2xl border-2 focus:ring-2 focus:ring-inset focus:ring-pistach sm:text-sm sm:leading-6 hover:border-pistach"
          >
            <Link to={linkTo}>
              <div className="font-bold">{notification.title}</div>
              <div className="text-sm">{notification.body}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
