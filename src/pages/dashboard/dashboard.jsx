import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navigation";
import "./dashboard.scss";
import { NewTask } from "../newTask";
import { TableList } from "./TableList";
export default function Dashboard() {
  const [quickTask, setQuickTask] = useState();
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || false;
  const [tasks, setTask] = useState(storedTasks);
  var completed = [];

  try {
    tasks.map((data, i) => {
      if (data.complete === true) {
        completed.push(data);
      }
      return data;
    });
  } catch (error) {
    console.log(error);
  }

  const qTask = (e) => {
    setQuickTask(e);
  };
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <UserCard points={completed.length} />
        <TableList quickTask={quickTask} />
        <NewTask qTask={qTask} />
      </div>
    </div>
  );
}

export function UserCard({ progress, points }) {
  const profile = useRef(null);
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (profile) {
      profile.current.style.height = profile.current.offsetWidth + "px";
    }
    window.addEventListener("resize", () => {
      if (profile) {
        profile.current.style.height = profile.current.offsetWidth + "px";
      }
    });
  }, []);
  const [activeFilter, setActiveFilter] = useState(["active-filter", ""]);
  const filterImportant = () => {
    setActiveFilter(["", "active-filter"]);
  };
  const filterAll = () => {
    setActiveFilter(["active-filter", ""]);
  };
  return (
    <div
      className={browserWidth > 500 ? "usercard" : "mobile_usercard usercard"}
    >
      <div className="usercard-details">
        <div className="usercard-profile" ref={profile}></div>
        <div className="usercard-top">Hi Solarin</div>
        <div className="usercard-progress">
          <span>{progress || 0}%</span>
          <div
            className="progress"
            style={{ width: `${progress || 0}%` }}
          ></div>
        </div>
        <div className="usercard-game">
          <div className="usercard-points">
            <i className="fa-solid fa-trophy"></i>
            <span>{points || 0}</span>
          </div>
          <div className="usercard-streak">
            <i className="fa-solid fa-fire"></i> <span>3</span>
          </div>
        </div>
      </div>
      <div className="usercard-tabs">
        <div className="usercard-tabs-title">Tasks</div>
        <div className="usercard-tabs-filter">
          <div className={`${activeFilter[0]} all`} onClick={filterAll}>
            <span>All</span>
            <span>8</span>
          </div>
          <div
            className={`${activeFilter[1]} important`}
            onClick={filterImportant}
          >
            <span>Important</span>
            <span>2</span>
          </div>
        </div>
        <div className="usercard-tabs-new">
          <span>New Task</span>
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
    </div>
  );
}
