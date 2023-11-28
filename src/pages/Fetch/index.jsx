export function FetchTask() {
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

  const storedDB = JSON.parse(localStorage.getItem("tasks")) || false;

  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const currentDay = currentDate.getDate().toString().padStart(2, "0");

  if (localStorage.getItem("tasks") == null) {
    localStorage.setItem("tasks", JSON.stringify(taskDb));
  } else {
    const todayTasks = storedDB.tasks
      .map((task, index) => ({ ...task, index }))
      .filter((task) => {
        const dateObj = new Date(`${task.date} 2023`);
        const month = (dateObj.getMonth() + 1).toString().padStart(2, 0);
        const day = dateObj.getDate().toString().padStart(2, 0);
        return (
          Number(month) === Number(currentMonth) &&
          Number(day) === Number(currentDay)
        );
      });
    const pastTasks = storedDB.tasks
      .map((task, index) => ({ ...task, index, viewonly: true }))
      .filter((task) => {
        const dateObj = new Date(`${task.date} 2023`);
        const month = (dateObj.getMonth() + 1).toString().padStart(2, 0);
        const day = dateObj.getDate().toString().padStart(2, 0);
        return (
          (Number(month) <= Number(currentMonth) &&
            Number(day) < Number(currentDay)) ||
          Number(month) < Number(currentMonth)
        );
      });
    const futureTasks = storedDB.tasks
      .map((task, index) => ({ ...task, index }))
      .filter((task) => {
        const dateObj = new Date(`${task.date} 2023`);
        const month = (dateObj.getMonth() + 1).toString().padStart(2, 0);
        const day = dateObj.getDate().toString().padStart(2, 0);
        return (
          (Number(month) >= Number(currentMonth) &&
            Number(day) > Number(currentDay)) ||
          Number(month) > Number(currentMonth)
        );
      });

    const completed = storedDB.tasks
      .map((task) => ({ ...task }))
      .filter((task) => {
        const dateObj = new Date(`${task.date} 2023`);
        const month = (dateObj.getMonth() + 1).toString().padStart(2, 0);
        const day = dateObj.getDate().toString().padStart(2, 0);
        return (
          Number(month) === Number(currentMonth) &&
          Number(day) === Number(currentDay) &&
          task.complete
        );
      });
    const streak = storedDB.tasks
      .map((task) => ({ ...task }))
      .filter((task) => {
        return task.complete;
      });

    const game = {
      completed,
      streak,
    };
    console.log(game);
    localStorage.setItem("game", JSON.stringify(game));

    localStorage.setItem("Today", JSON.stringify(todayTasks));
    localStorage.setItem("Past", JSON.stringify(pastTasks));
    localStorage.setItem("Future", JSON.stringify(futureTasks));
  }
}
