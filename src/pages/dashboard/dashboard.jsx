import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navigation";
import "./dashboard.scss";
import { QuickTask } from "../quickTask";
import { TableList } from "./TableList";
import CreateTask from "../createTask";
import { FetchTask } from "../Fetch";
export default function Dashboard() {
  const [quickTask, setQuickTask] = useState();
  const [pop, setPop] = useState(false);
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const todayTasks = JSON.parse(localStorage.getItem("Today")) || [];
  const [newAction, setNewAction] = useState("");
  const game = JSON.parse(localStorage.getItem("game")) || [];
  const [completed, setCompleted] = useState(game.completed);
  const [streak, setStreak] = useState([game.streak]);
  FetchTask();
  useEffect(() => {
    const game = JSON.parse(localStorage.getItem("game")) || [];
    setCompleted(game.completed);
    setStreak(game.streak);
  }, [newAction]);

  const qTask = (e) => {
    setQuickTask(e);
  };
  const newPop = (e) => {
    setPop(e);
  };
  const popReturn = (e) => {
    setPop(e);
  };
  const action = (e) => {
    setNewAction(e);
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <UserCard
          name={storedTasks.name}
          all={storedTasks.tasks && storedTasks.tasks.length}
          points={storedTasks.tasks && storedTasks.tasks.length * 2}
          streak={streak.length}
          completed={completed.length}
          progress={
            storedTasks.tasks && (completed.length / todayTasks.length) * 100
          }
          newPop={newPop}
        />
        <TableList quickTask={quickTask} setAction={action} />
        <QuickTask qTask={qTask} />
        {pop && <CreateTask qTask={qTask} newPop={pop} popReturn={popReturn} />}
      </div>
    </div>
  );
}

export function UserCard({
  name,
  progress,
  points,
  streak,
  newPop,
  all,
  completed,
}) {
  const profile = useRef(null);
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (profile.current) {
      profile.current.style.height = profile.current.scrollWidth + "px";
    }
    window.addEventListener("resize", () => {
      if (profile) {
        profile.current.style.height = profile.current.scrollWidth + "px";
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
        <div className="usercard-top">
          Hi Solarin <span className="far fa-pen-to-square"></span>
        </div>
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
            <i className="fa-solid fa-fire"></i> <span>{streak || 0}</span>
          </div>
        </div>
      </div>
      <div className="usercard-tabs">
        <div className="usercard-tabs-title">Tasks</div>
        <div className="usercard-tabs-filter">
          <div className={`${activeFilter[0]} all`} onClick={filterAll}>
            <span>All</span>
            <span>{all || 0}</span>
          </div>
          <div
            className={`${activeFilter[1]} important`}
            onClick={filterImportant}
          >
            <span>Completed</span>
            <span>{completed || 0}</span>
          </div>
        </div>
        <div className="usercard-tabs-new" onClick={() => newPop(true)}>
          <span>New Task</span>
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
    </div>
  );
}
