import moment from "moment";
import { event } from "src/interfaces/EventCalendar";
import TimeKeepingAttribute from "../../interfaces/TimeKeeping";
import { CustomError } from "../../middlewares/handlerError";
export const getTimeKeepings = (timekeepings: TimeKeepingAttribute[]) => {
  let arrOfTimeKeepings: event[] = [
    {
      title: "",
      backgroundColor: "",
      date: ""
    }
  ];
  let dateHaveTimeKeeping: string[] = [];

  //duyet tung phan tu trong timekeeping
  if (!timekeepings) {
    throw new CustomError("not found timekeeping");
  }
  timekeepings.forEach((element: TimeKeepingAttribute) => {
    dateHaveTimeKeeping.push(moment(element.create_at).format("YYYY-MM-DD"));
    if (element.check_in !== null) {
      let check_in = {
        title: moment(new Date(element.check_in)).format("HH:mm"),
        backgroundColor:
          moment(new Date(element.check_in)).format("HH:mm") < "09:00"
            ? "#1dc9b7"
            : "#fd3995",
        date: moment(element.create_at).format("YYYY-MM-DD"),
        displayOrder: 1
      };

      arrOfTimeKeepings.push(check_in);
    } else if (element.check_in === null) {
      let notCheckin = {
        title: "K",
        backgroundColor: "#fd3995",
        date: moment(element.create_at).format("YYYY-MM-DD")
      };
      arrOfTimeKeepings.push(notCheckin);
    }

    if (element.check_out !== null) {
      let check_out = {
        title: moment(new Date(element.check_out)).format("HH:mm"),
        backgroundColor:
          moment(new Date(element.check_out)).format("HH:mm") < "17:30"
            ? "#fd3995"
            : "#1dc9b7",
        date: moment(element.create_at).format("YYYY-MM-DD"),
        displayOrder: 2
      };
      arrOfTimeKeepings.push(check_out);
    }
  });

  //tim xem ngay hom nay da co timekeeping chua, neu chua thi hien trang thai chekc in
  return {
    arrOfTimeKeepings,
    dateHaveTimeKeeping
  };
};
