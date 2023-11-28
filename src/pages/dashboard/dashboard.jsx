import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navigation";
import "./dashboard.scss";
import { QuickTask } from "../quickTask";
import { TableList } from "./TableList";
import CreateTask from "../createTask";
export default function Dashboard() {
  const [quickTask, setQuickTask] = useState();
  const [pop, setPop] = useState(false);
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTask] = useState(storedTasks);
  const storeStreak = localStorage.getItem("streak") || 0;

  const [streak, setStreak] = useState(storeStreak);
  const [progress, setProgress] = useState("");
  const streakArray = [];
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const currentDay = currentDate.getDate().toString().padStart(2, "0");

  const taskDb = {
    name: "Solarin",
    profile: 1,
    tasks: [
      {
        task: "Mtcheew",
        priority: "High",
        time: "1AM",
        complete: false,
        date: "Nov 28",
        dayIndex: 28,
        monthIndex: 11,
      },
      {
        task: "Eran",
        priority: "Normal",
        time: "2PM",
        complete: false,
        date: "Nov 29",
        dayIndex: 28,
        monthIndex: 11,
      },
      {
        task: "Shit",
        priority: "High",
        time: "1AM",
        complete: false,
        date: "Nov 27",
        dayIndex: 28,
        monthIndex: 11,
      },
    ],
  };

  const todayTasks = taskDb.tasks.filter((task) => {
    const dateObj = new Date(`${task.date} 2023`);
    const month = (dateObj.getMonth() + 1).toString().padStart(2, 0);
    const day = dateObj.getDate().toString().padStart(2, 0);
    return (
      Number(month) === Number(currentMonth) &&
      Number(day) === Number(currentDay)
    );
  });
  const pastTasks = taskDb.tasks.filter((task) => {
    const dateObj = new Date(`${task.date} 2023`);
    const month = (dateObj.getMonth() + 1).toString().padStart(2, 0);
    const day = dateObj.getDate().toString().padStart(2, 0);
    return (
      (Number(month) <= Number(currentMonth) &&
        Number(day) < Number(currentDay)) ||
      Number(month) < Number(currentMonth)
    );
  });
  const futureTasks = taskDb.tasks.filter((task) => {
    const dateObj = new Date(`${task.date} 2023`);
    const month = (dateObj.getMonth() + 1).toString().padStart(2, 0);
    const day = dateObj.getDate().toString().padStart(2, 0);
    console.log(day);
    return (
      (Number(month) >= Number(currentMonth) &&
        Number(day) > Number(currentDay)) ||
      Number(month) > Number(currentMonth)
    );
  });
  localStorage.setItem("Today", JSON.stringify(todayTasks));
  localStorage.setItem("Past", JSON.stringify(pastTasks));
  localStorage.setItem("Future", JSON.stringify(futureTasks));

  console.log(todayTasks);

  // if (!localStorage.getItem("first")) {
  //   localStorage.setItem("first", dayIndex);
  // }
  // // if (!localStorage.getItem("points")) {
  // //   localStorage.setItem("points", 0);
  // // }
  const [today, setToday] = useState([]);
  useEffect(() => {
    setTask(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  // useEffect(() => {
  //   try {
  //     tasks.map((data, index) => {
  //       today.push(data);
  //       if (
  //         Number(data.dayIndex) === Number(dayIndex) &&
  //         Number(data.monthIndex) === Number(monthIndex) + 1
  //       ) {
  //         if (data.complete === true) {
  //           streakArray.push(data);
  //         }
  //       }
  //       return data;
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   try {
  //     localStorage.setItem("streak", Math.round(streakArray.length));
  //     setProgress(Math.round((streakArray.length / today.length) * 100));
  //     setStreak(Math.abs(dayIndex - Number(localStorage.getItem("first"))));
  //   } catch (error) {}
  // }, []);

  const completed = [];
  try {
    tasks.map((data, i) => {
      if (data.complete) {
        completed.push(data);
        console.log(completed);
      }
      return data;
    });
  } catch (error) {}

  const qTask = (e) => {
    setQuickTask(e);
  };
  const newPop = (e) => {
    setPop(e);
  };
  const popReturn = (e) => {
    setPop(e);
  };
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <UserCard
          points={(completed && completed.length * 3) || 0}
          streak={streak || 0}
          all={(tasks && tasks.length) || 0}
          completed={completed && completed.length}
          progress={progress}
          newPop={newPop}
        />
        <TableList quickTask={quickTask} />
        <QuickTask qTask={qTask} />
        {pop && <CreateTask qTask={qTask} newPop={pop} popReturn={popReturn} />}
      </div>
    </div>
  );
}

export function UserCard({ progress, points, streak, newPop, all, completed }) {
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
