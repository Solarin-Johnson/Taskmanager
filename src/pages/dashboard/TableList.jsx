import { useEffect, useRef, useState } from "react";
import Table from "../../components/table";

export function TableList({ quickTask }) {
  const currentDate = new Date();
  const options = { day: "2-digit", month: "short", year: "numeric" };
  var todayDate = currentDate.toLocaleDateString("en-UK", options);
  var todayDay = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || false;
  const [tasks, setTask] = useState(storedTasks);
  const tabContainer = useRef(null);
  const todayTable = [];
  const upcomingTable = [];

  const todaysdate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(currentDate);

  const dayIndex = currentDate.getDate().toString().padStart(2, "0");
  const monthIndex = currentDate.getMonth().toString().padStart(2, "0");

  useEffect(() => {
    try {
      const updatedTasks = [...tasks];
      updatedTasks.map((data, index) => {
        if (
          (Number(data.monthIndex) <= Number(monthIndex) + 1 &&
            Number(data.dayIndex) < Number(dayIndex)) ||
          Number(data.monthIndex) < Number(monthIndex) + 1
        ) {
          updatedTasks.splice(index, 1);
          setTask(updatedTasks);
        }
        return localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  try {
    tasks.map((data, index) => {
      if (
        Number(data.dayIndex) === Number(dayIndex) &&
        Number(data.monthIndex) === Number(monthIndex) + 1
      ) {
        todayTable.push([data, index]);
      } else {
        upcomingTable.push([data, index]);
      }
      return data;
    });
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || false;
    setTask(storedTasks);
  }, [quickTask]);
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || false;
    setTask(storedTasks);
  }, []);

  return (
    <div className="table-wrapper">
      <div className="table">
        <div className="table-header">
          <div className="table-title">
            <span>Today</span>
            <span>{todayTable.length || 0}</span>
          </div>
          <div className="table-date">
            <span>{todayDay}</span> <span>{todayDate}</span>
          </div>
        </div>
        <div className="table-container" ref={tabContainer}>
          {(todayTable.length > 0 &&
            todayTable.map((task, index) => (
              <Table
                key={index}
                task={task[0].task}
                priority={task[0].priority}
                complete={task[0].complete}
                time={task[0].time}
                index={task[1]}
              />
            ))) || <Table />}
        </div>
      </div>

      <div className="table">
        <div className="table-header">
          <div className="table-title">
            <span>Upcoming</span>
            <span>{upcomingTable.length}</span>
          </div>
        </div>
        <div className="table-container" ref={tabContainer}>
          {(upcomingTable.length > 0 &&
            upcomingTable.map((task, index) => (
              <Table
                task={task[0].task}
                priority={task[0].priority}
                complete={task[0].complete}
                time={task[0].date}
                index={task[1]}
                i={index}
                key={index}
              />
            ))) || <Table />}
        </div>
      </div>
    </div>
  );
}
