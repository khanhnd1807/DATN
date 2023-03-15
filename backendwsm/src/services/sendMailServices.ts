import schedule from "node-schedule";
import { sendNewEmail } from "../mail/queues/email.queue";
import userServices from "./userServices";
import UserAttributes from "../interfaces/user";
import { CustomError } from "../middlewares/errorHandler";
export const sendMail = () => {
  //hen gio gui mail
  const date = new Date();
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const rule = new schedule.RecurrenceRule();
  rule.date = lastDay;
  rule.hour = 15;
  rule.minute = 0;

  const job = schedule.scheduleJob(rule, async function() {
    const users = await userServices.getAllUsers();
    if (users.length > 0) {
      users.map((data: UserAttributes) => {
        sendNewEmail({
          email: data.email,
        });
      });
    }

    throw new CustomError(404, "Loi khi gui mail");
  });
};
