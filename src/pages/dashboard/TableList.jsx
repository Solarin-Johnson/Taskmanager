import { useEffect, useRef, useState } from "react";
import Table from "../../components/table";
import { useInView } from "react-intersection-observer";

export function TableList({ quickTask }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const currentDate = new Date();
  const options = { day: "2-digit", month: "short", year: "numeric" };
  var todayDate = currentDate.toLocaleDateString("en-UK", options);
  var todayDay = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  const tabContainer = useRef(null);
  const [newAction, setNewAction] = useState();
  let todayData = localStorage.getItem("Today");
  let futureData = localStorage.getItem("Future");
  const [todayTable, setTodayTable] = useState(JSON.parse(todayData) || false);
  const [upcomingTable, setUpcomingTable] = useState(
    JSON.parse(futureData) || false
  );

  useEffect(() => {
    setTodayTable(JSON.parse(localStorage.getItem("Today")) || false);
    setUpcomingTable(JSON.parse(localStorage.getItem("Future")) || false);
  }, [newAction, quickTask]);

  const action = (e) => {
    setNewAction(e);
  };

  return (
    <div className={`table-wrapper`}>
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
                task={task.task}
                priority={task.priority}
                complete={task.complete}
                time={task.time}
                index={task.index}
                action={action}
              />
            ))) || <Table />}
        </div>
      </div>

      <div className="table">
        <div className="table-header">
          <div className="table-title">
            <span>Upcoming</span>
            <span>{upcomingTable.length || 0}</span>
          </div>
        </div>
        <div className="table-container" ref={tabContainer}>
          {(upcomingTable.length > 0 &&
            upcomingTable.map((task, index) => (
              <Table
                task={task.task}
                priority={task.priority}
                complete={task.complete}
                time={task.date}
                index={task.index}
                i={index}
                key={index}
                action={action}
              />
            ))) || <Table />}
        </div>
      </div>
    </div>
  );
}
