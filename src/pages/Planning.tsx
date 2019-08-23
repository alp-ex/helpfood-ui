import React, { useState, useEffect } from "react";
import PlanningNav from "@components/PlanningNav";
import MenuOfTheDay from "@components/MenuOfTheDay";

const Planning = () => {
  const currentWeekDay = new Intl.DateTimeFormat("en-US", {
    weekday: "long"
  }).format(Date.now());
  const [currentDay, setCurrentDay] = useState(currentWeekDay);
  const handleClickOnDay = (day: string) => setCurrentDay(day);

  return (
    <div>
      <PlanningNav currentDay={currentDay} onDayChoose={handleClickOnDay} />
      <MenuOfTheDay currentDay={currentDay} />
    </div>
  );
};

export default Planning;
