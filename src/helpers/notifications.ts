// @ts-ignore
import { NotificationManager } from "react-notifications";

export function createNotification(
  type: "info" | "success" | "warning" | "error" = "success",
  { title, message } = { title: "Error", message: "Something went wrong" },
) {
  return NotificationManager[type](title, message);
}
