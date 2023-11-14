import { useState } from "react";
import "./table.scss";
export default function Table({ task, status, priority, complete, time }) {
  const [checked, setChecked] = useState(complete);
  const check = () => {
    setChecked(!checked);
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
    return (
      <div className="table-items null">
        No tasks available, just chill and enjoy!{" "}
      </div>
    );
  }
}
