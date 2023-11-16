import { useState } from "react";
import "./createTask.scss";
export default function CreateTask() {
  const currentYear = new Date().getFullYear();
  const months = [
    { value: "01", name: "January" },
    { value: "02", name: "February" },
    { value: "03", name: "March" },
    { value: "04", name: "April" },
    { value: "05", name: "May" },
    { value: "06", name: "June" },
    { value: "07", name: "July" },
    { value: "08", name: "August" },
    { value: "09", name: "September" },
    { value: "10", name: "October" },
    { value: "11", name: "November" },
    { value: "12", name: "December" },
  ].filter((monthOption) => {
    const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed
    return (
      currentYear === parseInt(currentYear, 10) &&
      parseInt(monthOption.value, 10) >= currentMonth
    );
  });

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const updateSelectedDate = () => {
    if (day && month) {
      setSelectedDate(`${month}-${day}`);
    } else {
      setSelectedDate("");
    }
  };
  const updateDayOptions = () => {
    const daysInMonth = new Date(
      new Date().getFullYear(),
      Number(month),
      0
    ).getDate();

    const dayOptions = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    );

    return (
      <>
        <option value="Time" disabled>
          Day
        </option>
        {dayOptions.map((dayOption) => (
          <option key={dayOption} value={dayOption}>
            {dayOption}
          </option>
        ))}
      </>
    );
  };

  return (
    <div className="create-task">
      <div className="create-task-container">
        <div className="create-task-head">
          <span>Create Task</span>
          <i className="fa-solid fa-check-double"></i>
        </div>
        <div className="create-task-form">
          <label className="create-task-field">
            <div>Title</div>
            <input type="text" name="title" id="title" />
          </label>
          <div className="create-task-cluster">
            <div>Due date</div>
            <div className="due">
              <select
                id="day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                {updateDayOptions()}
              </select>
              <select
                name="month"
                id="month"
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="" disabled>
                  Month
                </option>
                {months.map((month, i) => (
                  <option value={month.value}>{month.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
