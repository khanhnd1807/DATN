import Bull from "bull";
import emailProcess from "../mailServices/emailServices";
import { setQueues, BullAdapter } from "bull-board";

// https://optimalbits.github.io/bull
const emailQueue = new Bull("email", {
  redis: { host: "redis", port: 6379 },
  limiter: {
    max: 1000,
    duration: 5000,
  },
});

setQueues([new BullAdapter(emailQueue)]);

emailQueue.process(emailProcess);

const sendNewEmail = (data: any) => {
  emailQueue.add(data, {
    attempts: 5,
    lifo: true,
    delay: 3000,
  });
};

export { sendNewEmail };
