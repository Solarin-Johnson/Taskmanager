import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navigation";
import "./dashboard.scss";
import Table from "../../components/table";
export default function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <UserCard />
        <TodayList />
        <NewTask />
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

export function TodayList() {
  const currentDate = new Date();
  const options = { day: "2-digit", month: "short", year: "numeric" };
  var todayDate = currentDate.toLocaleDateString("en-UK", options);
  var todayDay = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  const tasks = [
    {
      task: "Create home page Puzzle",
      priority: "high",
      complete: false,
      time: "2 PM",
    },
    {
      task: "Wizkid Concert",
      priority: "high",
      complete: true,
      time: "6 PM",
    },
    {
      task: "Take a Walk",
      priority: "normal",
      complete: false,
      time: "2 PM",
    },
  ];
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
      <div className="table-container">
        {tasks.map((task, index) => (
          <Table
            task={task.task}
            priority={task.priority}
            complete={task.complete}
            time={task.time}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export function NewTask() {
  return (
    <div className="newtask">
      <div className="newtask-head">New Task</div>
      <div className="newtask-task">
        <input name="" id="newtask-text" maxLength={50} />
      </div>
      <div className="newtask-priority">
        <div>Priority</div>
        <div>
          <i class="fa-solid fa-fire-flame-curved"></i>
          <span>High</span>
        </div>
        <div>
          <i class="fa-solid fa-fire-flame-curved"></i>
          <span>Normal</span>
        </div>
      </div>
      <div className="newtask-time">
        <div>
          Time <i class="fa-solid fa-clock"></i>
        </div>
        <input type="number" name="" id="time" maxLength={2} />
      </div>
      <label htmlFor="date" className="newtask-date">
        <div>
          Date <i class="fa-regular fa-calendar"></i>
        </div>
        <input type="date" name="" id="date" maxLength={2} />
      </label>
      <div className="newtask-submit">Create Task</div>
    </div>
  );
}
