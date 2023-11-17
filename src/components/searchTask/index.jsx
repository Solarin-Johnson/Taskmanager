import Table from "../table";
import "./searchTask.scss";

export function SearchTask({ search }) {
  if (search.length > 0) {
    return (
      <div className="search-task-container">
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
  return storedTasks && storedTasks.length !== 0 ? (
    storedTasks.map((task, index) => (
      <Table
        key={index}
        task={task.task}
        priority={task.priority}
        complete={task.complete}
        time={task.time}
        index={index}
      />
    ))
  ) : (
    <div className="table-items null">No tasks found </div>
  );
}
