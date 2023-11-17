import { useRef } from "react";
import "./newtask.scss";

export function QuickTask({ qTask }) {
  const quickTaskValue = useRef(null);
  const quickTask = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const today = new Date();
    const options = { month: "short", day: "2-digit" };
    const todaysdate = new Intl.DateTimeFormat("en-US", options).format(today);
    const dayIndex = today.getDate().toString().padStart(2, "0");
    const monthIndex = today.getMonth().toString().padStart(2, "0");
    if (quickTaskValue.current.value.length >= 4) {
      const newTask = [
        ...storedTasks,
        {
          task: quickTaskValue.current.value,
          priority: "normal",
          time: "Soon",
          complete: false,
          date: todaysdate,
          dayIndex: dayIndex,
          monthIndex: Number(monthIndex) + 1,
        },
      ];
      localStorage.setItem("tasks", JSON.stringify(newTask));
      qTask(newTask);
    }
  };
  return (
    <div className="newtask">
      <div className="newtask-head">
        Quick Task
        <i className="fa-solid fa-plus"></i>
      </div>
      <div className="newtask-task">
        <textarea
          name=""
          ref={quickTaskValue}
          id="newtask-text"
          maxLength={100}
        />
      </div>
      <span className="err">Lengthen task to more than 3 Characters </span>

      <div className="newtask-submit" onClick={quickTask}>
        Create Task
      </div>
    </div>
  );
}
