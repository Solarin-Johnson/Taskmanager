import { useRef } from "react";
import './newtask.scss'

export function NewTask({ qTask }) {
  const quickTaskValue = useRef(null);
  const quickTask = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const today = new Date();
    const options = { month: "short", day: "2-digit" };
    const todaysdate = new Intl.DateTimeFormat("en-US", options).format(today);
    if (quickTaskValue.current.value.length >= 5) {
      const newTask = [
        ...storedTasks,
        {
          task: quickTaskValue.current.value,
          priority: "normal",
          time: "Soon",
          complete: false,
          date: todaysdate,
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
        <i class="fa-solid fa-plus"></i>
      </div>
      <div className="newtask-task">
        <textarea
          name=""
          ref={quickTaskValue}
          id="newtask-text"
          maxLength={100}
        />
      </div>

      <div className="newtask-submit" onClick={quickTask}>
        Create Task
      </div>
    </div>
  );
}
