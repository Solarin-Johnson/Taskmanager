import { useState } from "react";
import "./table.scss";
export default function Table({
  task,
  status,
  priority,
  complete,
  time,
  index,
  i,
}) {
  const [checked, setChecked] = useState(complete);
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  const check = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(index);
    setChecked(!checked);
    const newState = [...storedTasks];
    newState[index].complete = !checked;
    localStorage.setItem("tasks", JSON.stringify(newState));
  };
  if (task) {
    return (
      <div className="table-items">
        <div className="table-items-check" onClick={check}>
          <i id={checked && "checked"} class="fa-regular fa-circle-check"></i>
        </div>
        <div className="table-items-name">{task}</div>
        <div
          id={priority === "high" && "high_prior"}
          className="table-items-priority"
        >
          <span>Priority</span>
          <i class="fa-solid fa-fire-flame-curved"></i>
          <span>{priority || "normal"}</span>
        </div>
        <div className="table-items-time">
          <span>Time</span>
          <i class="fa-regular fa-calendar-days"></i>
          <span>{time}</span>
        </div>
        <div id={checked && "complete"} className="table-items-status">
          {checked ? "Completed" : "In Progress"}
        </div>
      </div>
    );
  } else {
    console.log("false");
    return (
      <div className="table-items null">
        No tasks available, Enjoy your day!{" "}
      </div>
    );
  }
}
