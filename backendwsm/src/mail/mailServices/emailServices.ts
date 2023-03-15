import { Job } from "bull";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import moment from "moment";
dotenv.config();
const {
  EMAIL_APP = "khanhnd1807@gmail.com",
  EMAIL_APP_PASSWORD = "byjnesauagbumnsy",
  FRONTEND_APP = "fe.wsm.zinza.com",
} = process.env;
const emailProcess = async (job: Job) => {
  const transporter = nodemailer.createTransport({
    // host: "localhost",
    // port: 1025,
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: EMAIL_APP, // generated ethereal user
      pass: EMAIL_APP_PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Nguyen Duy Khanh" <khanhnd1807@gmail.com>',
    to: job.data.email,
    //to: "khanhduys923@gmail.com",
    subject: `${job.data.keyword} request của bạn`,
    html: `<h3>${job.data.keyword} request của bạn</h3>
    <p>${job.data.leader} đã ${job.data.keyword} request ${
      job.data.detail
    }, khoảng thời gian : ${moment(job.data.time_start).format(
      "DD-MM-YYYY HH:MM"
    )} - ${moment(job.data.time_end).format(
      "DD-MM-YYYY HH:MM"
    )} , với lí do " ${job.data.description} "</p>
    <p>để xem lại request , bạn có thể nhấp vào <a href="${FRONTEND_APP}/user/requets/${
      job.data.request_id
    }">đây</a>.</p>
    `,
  });
};

export default emailProcess;
