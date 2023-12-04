import { useEffect, useRef, useState } from "react";
import "./table.scss";
import { useInView } from "react-intersection-observer";
import { FetchTask } from "../../pages/Fetch";
export const vibrate = (x) => {
  if ("vibrate" in navigator) {
    navigator.vibrate(x);
  }
};
export default function Table({
  task,
  status,
  priority,
  complete,
  time,
  index,
  i,
  action,
}) {
  const [swipeLeftRef, leftInView] = useInView({
    triggerOnce: false,
    threshold: 0.25,
  });

  const [swipeRightRef, rightInView] = useInView({
    triggerOnce: false,
    threshold: 0.25,
  });
  const [checked, setChecked] = useState(complete);
  const tableItemsContainer = useRef(null);

  useEffect(() => {
    const clean = tableItemsContainer.current;
    if (clean) {
      clean.firstChild.classList = "swipe-left";
      clean.lastChild.classList = "swipe-right";
    }

    if (leftInView) {
      clean.firstChild.classList.add("swiped-left");
      vibrate(70);
      check();
    }
    if (rightInView) {
      clean.lastChild.classList.add("swiped-right");
      vibrate(50);
      clean.classList.add("slide-away");
      setTimeout(() => {
        deleteTask();
      }, 400);
    }
  }, [leftInView, rightInView]);

  const [tableItems, inView] = useInView({
    triggerOnce: true,
  });

  const [itemsNull, nullInView] = useInView({
    triggerOnce: true,
  });

  const check = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setChecked(!checked);
    const newState = storedTasks;
    storedTasks.tasks[index].complete = !checked;
    localStorage.setItem("tasks", JSON.stringify(newState));
    FetchTask();
    action(index + checked);
    vibrate(50);
  };

  const deleteTask = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newState = storedTasks;
    console.log(index);
    newState.tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(newState));
    FetchTask();
    action(index + "deleted");
    vibrate(50);
  };
  if (task) {
    return (
      <div
        className={`table-items-container ${inView ? "in-viewport" : ""}`}
        ref={tableItemsContainer}
      >
        <div className="swipe-left" ref={swipeLeftRef}>
          <span
            className="far fa-circle-check"
            style={{ color: "#FFF" }}
          ></span>
        </div>
        <div className="table-items" ref={tableItems}>
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
          <div
            id={(checked && "complete") || ""}
            className="table-items-status"
          >
            {checked ? "Completed" : "In Progress"}
          </div>
          <div className="table-items-delete" onClick={deleteTask}>
            <span
              className="far fa-trash-can"
              style={{ color: "#FF6347" }}
            ></span>
          </div>
        </div>
        <div className="swipe-right" ref={swipeRightRef}>
          <span className="far fa-trash-can" style={{ color: "#FFF" }}></span>
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
