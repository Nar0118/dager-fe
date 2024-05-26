import { notification } from "antd";

import "./styles.css";

function getNecessaryStyle(status) {
  switch (status) {
    case "error":
      return "errorNoticeMessage";
    case "success":
      return "successNoticeMessage";
    default:
      return "successNoticeMessage";
  }
}

export default function openNotification({
  status,
  messages,
  descriptions,
  redirect,
}) {
  notification.open({
    message: messages,
    description: descriptions,
    className: `${getNecessaryStyle(status)}`,
    onClick: () => {
      if (redirect) window.location.href = redirect;
    },
  });
}
