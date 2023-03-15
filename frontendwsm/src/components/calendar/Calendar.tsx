import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//Importing Calendar Modules
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import viLocale from "@fullcalendar/core/locales/vi";
import "../../style/style.scss";
import moment from "moment";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  checkIn,
  checkOut,
  timeKeepings,
} from "../../redux/slices/TimeKeeings.slice";
import { useSelector } from "react-redux";
import TimeKeepingAttribute from "../../interfaces/TimeKeeping";
import rrulePlugin from "@fullcalendar/rrule";
import { event } from "../../interfaces/EventCalendar";
import { getTimeKeepings } from "./TimeKeepings";
import { checkTimeKeeping } from "../../redux/slices/CheckTimeKeeping.slice";

export const Calendar: React.FC = () => {
  const dispatch = useAppDispatch();
  const checkStatusTimeKeeping = useSelector(
    (state: RootState) => state.checkTimeKeeping.check
  );

  const [checkin, setCheckin] = useState<string>(checkStatusTimeKeeping);
  const [event, setEvent] = useState<event[]>([]);
  const timekeepings: TimeKeepingAttribute[] = useSelector(
    (state: RootState) => state.timeKeepingReducers.timeKeepings
  );

  const [exdate, setExdate] = useState<string[]>([]);
  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    dispatch(timeKeepings());
    setCheckin(checkStatusTimeKeeping);
  }, [checkStatusTimeKeeping]);
  useEffect(() => {
    setEvent(getTimeKeepings(timekeepings).arrOfTimeKeepings); //set event  cho cac ngay
    setExdate(getTimeKeepings(timekeepings).dateHaveTimeKeeping); // set event cac ngay duoc cham cong}
    dispatch(checkTimeKeeping());
  }, [timekeepings]);

  useEffect(() => {
    setTimeout(() => {
      setShowComponent(!showComponent);
    }, 100);
  }, []);

  const handleCheckin = () => {
    dispatch(checkIn());
    dispatch(timeKeepings());
  };

  const handleCheckout = () => {
    dispatch(checkOut());
    dispatch(timeKeepings());
  };

  function getPreviousDay() {
    const date = new Date();
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    return previous;
  }

  return (
    <div className="container p-5">
      {showComponent && (
        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            rrulePlugin,
            dayGridPlugin,
          ]}
          initialView="dayGridMonth"
          locale={viLocale}
          customButtons={{
            myCustomButton: {
              text: checkin.toString() === "0" ? "Check-in" : "Check-out",
              click:
                checkin.toString() === "0" ? handleCheckin : handleCheckout,
            },
          }}
          headerToolbar={{
            start: "title",
            end:
              Number(checkin) < 2 &&
              new Date().getDay() !== 0 &&
              new Date().getDay() !== 6
                ? "myCustomButton today prev,next"
                : "today prev,next",
          }}
          eventOrder="displayOrder"
          events={[
            {
              title: "K",
              backgroundColor: "#fd3995",
              rrule: {
                freq: "daily",
                dtstart: "2000-01-01",
                until: moment(getPreviousDay()).format("YYYY-MM-DD"),
              },
              exdate: exdate,
            },
            ...event,
          ]}
        />
      )}
    </div>
  );
};
