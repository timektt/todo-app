import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // เพิ่มสำหรับอนิเมชัน
import Header from "./components/Header";
import ToDoForm from "./components/ToDoForm";
import ToDoList from "./components/ToDoList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  // อัปเดตเวลาแบบเรียลไทม์
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSearch = () => {
    setFilteredTasks(
      tasks.filter((task) =>
        task.text.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const handleResetSearch = () => {
    setSearch("");
    setFilteredTasks([]);
  };

  const quickAddTask = () => {
    addTask("Quick Task - Example");
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div
      className={`min-h-screen flex flex-col items-center relative ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* นาฬิกา */}
      <div className="absolute top-4 left-4 text-sm font-medium">
        {currentTime.toLocaleString()}
      </div>

      {/* ปุ่ม Light/Dark Mode */}
      <button
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded shadow-lg"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* กล่อง To-Do List */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-16">
        <Header />
        <div className="mb-4 flex justify-between items-center">
          <div className="flex gap-2 w-full">
            <input
              type="text"
              placeholder="Search tasks..."
              className="flex-1 p-2 border rounded bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Search
            </button>
            <button
              onClick={handleResetSearch}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Reset
            </button>
          </div>
        </div>
        <ToDoForm addTask={addTask} />
        <button
          onClick={quickAddTask}
           className="w-auto mt-4 px-2 py-1 bg-indigo-500 text-white text-sm rounded shadow"
        >
          Quick Add Task
        </button>
        <ToDoList
          tasks={filteredTasks.length > 0 ? filteredTasks : tasks}
          toggleComplete={toggleComplete}
          removeTask={removeTask}
        />
        <div className="mt-4 text-center">
          <p>Completed Tasks: {completedTasks}</p>
          <p>Pending Tasks: {pendingTasks}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
