import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navigation";
import "./dashboard.scss";
import Table from "../../components/table";
export default function Dashboard() {
  const [quickTask, setQuickTask] = useState();
  const qTask = (e) => {
    setQuickTask(e);
  };
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <UserCard />
        <TodayList quickTask={quickTask} />
        <NewTask qTask={qTask} />
      </div>
    </div>
  );
}

export function UserCard({ progress = 65 }) {
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
          <span>{progress}%</span>
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="usercard-game">
          <div className="usercard-points">
            <i className="fa-solid fa-trophy"></i>
            <span>18</span>
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

export function TodayList({ quickTask }) {
  const currentDate = new Date();
  const options = { day: "2-digit", month: "short", year: "numeric" };
  var todayDate = currentDate.toLocaleDateString("en-UK", options);
  var todayDay = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || false;
  const [tasks, setTask] = useState(storedTasks);
  const tabContainer = useRef(null)
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || false;
    setTask(storedTasks);
  }, [quickTask]);

  return (
    <div className="table">
      <div className="table-header">
        <div className="table-title">
          <span>Today</span>
          <span>3</span>
        </div>
        <div className="table-date">
          <span>{todayDay}</span> <span>{todayDate}</span>
        </div>
      </div>
      <div className="table-container" ref={tabContainer}>
        {(tasks &&
          tasks.map((task, index) => (
            <Table
              task={task.task}
              priority={task.priority}
              complete={task.complete}
              time={task.time}
              key={index}
            />
          ))) || <Table />}
      </div>
    </div>
  );
}

export function NewTask({ qTask }) {
  const quickTaskValue = useRef(null);
  const quickTask = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (quickTaskValue.current.value.length >= 5) {
      const newTask = [
        ...storedTasks,
        {
          task: quickTaskValue.current.value,
          priority: "normal",
          time: "Soon",
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
