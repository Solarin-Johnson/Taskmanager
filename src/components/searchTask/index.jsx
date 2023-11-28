import { useEffect, useRef, useState } from "react";
import Table from "../table";
import "./searchTask.scss";

export function SearchTask({ search, searchRef }) {
  const searchBox = useRef(null);
  const [hideBox, setHideBox] = useState(false);
  const customBlur = (e) => {
    if (
      searchBox.current &&
      e.target !== searchBox.current &&
      !searchBox.current.contains(e.target) &&
      !searchRef.current.contains(e.target)
    ) {
      setHideBox(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", customBlur);

    return () => {
      document.removeEventListener("click", customBlur);
    };
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setHideBox(false);
    }
  }, [search]);

  if (search.length > 0 && !hideBox) {
    return (
      <div className="search-task-container" ref={searchBox}>
        <div className="search-task-head">
          <span>Search Result for</span> <span>{search}</span>
        </div>
        <div className="search-task-result">
          <SearchResults search={search} />
        </div>
      </div>
    );
  }
}

export function SearchResults({ search }) {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  const searchResults = storedTasks.tasks.filter((task) =>
    task.task.toLowerCase().includes(search.toLowerCase())
  );
  return storedTasks &&
    storedTasks.length !== 0 &&
    searchResults.length !== 0 ? (
    searchResults.map((task, index) => (
      <Table
        key={index}
        task={task.task}
        priority={task.priority}
        complete={task.complete}
        time={task.time}
      />
    ))
  ) : (
    <div className="table-items results-null">
      <span></span>
      <span>No tasks found</span>
      <span></span>
    </div>
  );
}
