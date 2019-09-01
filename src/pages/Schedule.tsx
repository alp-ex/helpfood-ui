import React, { useState, useEffect } from "react";
import ScheduleNav from "@components/ScheduleNav";
import MenuOfTheDay from "@components/MenuOfTheDay";
import { getUserHue } from "../services/getUserInformations";

const Schedule = () => {
  const currentWeekDay = new Intl.DateTimeFormat("en-US", {
    weekday: "long"
  }).format(Date.now());

  const [currentDay, setCurrentDay] = useState(currentWeekDay);
  const handleClickOnDay = (day: string) => setCurrentDay(day);

  return (
    <>
      <ScheduleNav
        hue={getUserHue() || 0}
        // this value should be based on the filling percentage of the schedule
        luminosity={50}
        currentDay={currentDay}
        onDayChoose={handleClickOnDay}
      />
      <MenuOfTheDay hue={getUserHue() || 0} currentDay={currentDay} />
    </>
  );
};

export default Schedule;
