import React, { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export interface Props {
  daysInAWeek?: number;
  weekStartAt?: number;
  currentDay: string;
  hue: number;
  luminosity: number;
  onDayChoose: (day: string) => void;
}

// we might want to interface a prop (for a translation purpose)
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
  hue,
  luminosity,
  onDayChoose
}: Props) => {
  const sortedDayOfWeek = [
    ...daysOfTheWeek.slice(weekStartAt - 1),
    ...daysOfTheWeek.slice(0, weekStartAt - 1)
  ].slice(0, daysInAWeek);
  const [currentDayIndex, setCurrentDayIndex] = useState(
    sortedDayOfWeek.findIndex(
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
        fontSize: "1.5em",
        color: `hsl(0, 0%, 100%)`,
        background: `hsl(${hue}, 100%, ${luminosity}%)`
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
