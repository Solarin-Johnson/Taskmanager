import { useEffect, useRef, useState } from "react";
import "./createTask.scss";
export default function CreateTask({ qTask, newPop, popReturn }) {
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

  const time = [
    { value: "1", name: "01" },
    { value: "2", name: "02" },
    { value: "3", name: "03" },
    { value: "4", name: "04" },
    { value: "5", name: "05" },
    { value: "6", name: "06" },
    { value: "7", name: "07" },
    { value: "8", name: "08" },
    { value: "9", name: "09" },
    { value: "10", name: "10" },
    { value: "11", name: "11" },
    { value: "12", name: "12" },
  ];

  const thisDate = new Date();
  const initDate = new Date(
    `2000-${thisDate.getMonth() + 1}-${thisDate.getDate()}`
  ).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const [day, setDay] = useState(thisDate.getDate());
  const [month, setMonth] = useState(months[0].value);
  const [data, setData] = useState({
    title: "",
    date: initDate,
    time: "1",
    xTime: "AM",
    priority: "High",
  });
  const [selectedDate, setSelectedDate] = useState("");
  const titleInput = useRef(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    updateSelectedDate();
  }, [day, month]);

  const updateSelectedDate = () => {
    const options = { month: "short", day: "numeric" };
    const MMMD = new Date(`2000-${month}-${day}`).toLocaleDateString(
      "en-US",
      options
    );
    setSelectedDate(MMMD);
  };

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      date: selectedDate,
    }));
  }, [selectedDate]);

  const updateDayOptions = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    const daysInMonth = new Date(
      new Date().getFullYear(),
      Number(month),
      0
    ).getDate();

    const dayOptions = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    ).filter(
      (dayOption) =>
        (dayOption >= currentDay && Number(month) === currentMonth) ||
        (dayOption >= 0 && Number(month) !== currentMonth)
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
  const monthAbbreviations = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };
  const submitTask = () => {
    if (data && data.title.length <= 4) {
      setErr(true);
    } else {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const newTask = storedTasks.tasks.push({
        task: data.title,
        priority: data.priority,
        time: `${data.time}${data.xTime}`,
        complete: false,
        date: data.date,
      });
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
      qTask(newTask);
      popReturn(false);
    }
  };
  const container = useRef(null);
  const hide = (e) => {
    popReturn(false);
  };

  const stopHide = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="create-task" onClick={hide} ref={container}>
      <div className="create-task-container" onClick={stopHide}>
        <div className="create-task-head">
          <span>Create Task</span>
          <i className="fa-solid fa-check-double"></i>
        </div>
        <div className="create-task-form">
          <label className="create-task-field">
            <div>
              <span>Title</span>
              <i className="fa-regular fa-file-lines"></i>
            </div>
            <input
              type="text"
              name="title"
              id="title"
              ref={titleInput}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }))
              }
            />
            {err && (
              <span className="titleErr">
                Please lengthen Title to more than 5 characters
              </span>
            )}
          </label>
          <div className="create-task-cluster">
            <div>
              <span>Date</span>
              <i className="fa-regular fa-calendar"></i>
            </div>
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
          <div className="create-task-cluster">
            <div>
              <span>Time</span>
              <i className="fa-regular fa-clock"></i>
            </div>
            <div>
              <select
                name="time"
                id="time"
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    time: e.target.value,
                  }))
                }
              >
                <option value="Time" disabled>
                  Time
                </option>
                {time.map((hour, i) => (
                  <option value={hour.value} key={hour.value}>
                    {hour.name}
                  </option>
                ))}
              </select>
              <select
                name=""
                id=""
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    xTime: e.target.value,
                  }))
                }
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          <label className="create-task-cluster">
            <div>
              <span>Priority</span>
              <i className="fa-solid fa-fire-flame-curved"></i>
            </div>
            <div>
              <select
                name="streak"
                id="streak"
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    priority: e.target.value,
                  }))
                }
              >
                <option value="High">High</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
          </label>
        </div>
        <div className="create-task-btn">
          <div onClick={submitTask}>Create</div>
        </div>
      </div>
    </div>
  );
}
