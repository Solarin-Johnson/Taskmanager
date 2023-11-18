import { useRef, useState } from "react";
import "./table.scss";
import { useInView } from "react-intersection-observer";
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

  const [tableItems, inView] = useInView({
    triggerOnce: true,
  });

  const [itemsNull, nullInView] = useInView({
    triggerOnce: true,
  });

  const check = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(index);
    setChecked(!checked);
    const newState = [...storedTasks];
    newState[index].complete = !checked;
    localStorage.setItem("tasks", JSON.stringify(newState));
  };

  const deleteTask = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newState = [...storedTasks];
    newState.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(newState));
    window.location.reload();
  };
  if (task) {
    return (
      <div
        className={`table-items ${inView ? "in-viewport" : ""}`}
        ref={tableItems}
      >
        <div className="table-items-check" onClick={check}>
          <i
            id={(checked && "checked") || ""}
            className="fa-regular fa-circle-check"
          ></i>
        </div>
        <div className="table-items-name">{task}</div>
        <div
          id={(priority === "High" && "high_prior") || ""}
          className="table-items-priority"
        >
          <span>Priority</span>
          <i className="fa-solid fa-fire-flame-curved"></i>
          <span>{priority || "Normal"}</span>
        </div>
        <div className="table-items-time">
          <span>Time</span>
          <i className="fa-regular fa-calendar-days"></i>
          <span>{time}</span>
        </div>
        <div id={(checked && "complete") || ""} className="table-items-status">
          {checked ? "Completed" : "In Progress"}
        </div>
        <div className="table-items-delete" onClick={deleteTask}>
          <span
            className="far fa-trash-can"
            style={{ color: "#FF6347" }}
          ></span>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div
          className={`table-items null ${nullInView ? "in-viewport" : ""}`}
          ref={itemsNull}
        >
          <span></span>
          No tasks available, Enjoy your day!{" "}
        </div>
      </>
    );
  }
}
