import React, { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export interface Props {
  daysInAWeek?: number;
  weekStartAt?: number;
  currentDay: string;
  onDayChoose: (day: string) => void;
}

// this should be a prop (for a translation purpose)
const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const PlanningNav = ({
  daysInAWeek = 7,
  weekStartAt = 1,
  currentDay,
  onDayChoose
}: Props) => {
  const sortedDayOfWeek = [
    ...daysOfTheWeek.slice(weekStartAt - 1),
    ...daysOfTheWeek.slice(0, weekStartAt - 1)
  ].slice(0, daysInAWeek);
  const [currentDayIndex, setCurrentDayIndex] = useState(
    daysOfTheWeek.findIndex(
      day => day.toLowerCase() === currentDay.toLowerCase()
    )
  );
  const handleClickNext = () =>
    currentDayIndex < daysOfTheWeek.length - 1 &&
    setCurrentDayIndex(currentDayIndex + 1);
  const handleClickPrevious = () =>
    currentDayIndex > 0 && setCurrentDayIndex(currentDayIndex - 1);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "3%",
        fontSize: "1em",
        color: "#f0754e"
      }}
    >
      {/* alter brightness when disabled */}
      <span
        style={{
          minWidth: "50px",
          minHeight: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        onClick={handleClickPrevious}
      >
        <MdChevronLeft />
      </span>
      <span>{daysOfTheWeek[currentDayIndex]}</span>
      <span
        style={{
          minWidth: "50px",
          minHeight: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        onClick={handleClickNext}
      >
        <MdChevronRight />
      </span>
    </div>
  );
};

export default PlanningNav;
