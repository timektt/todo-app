import React from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";

function ToDoItem({ task, toggleComplete, removeTask }) {
  const viewDetails = () => {
    alert(`Task Details:\n${task.text}\nStatus: ${task.completed ? "Completed" : "Pending"}`);
  };

  return (
    <motion.div
      className={`flex items-center justify-between p-2 mb-2 rounded ${
        task.completed ? "bg-green-300" : "bg-red-400"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <span
        onClick={() => toggleComplete(task.id)}
        className={`flex-1 cursor-pointer ${
          task.completed ? "line-through" : ""
        }`}
      >
        {task.text}
      </span>
      <div className="flex gap-2">
        <button
          onClick={viewDetails}
          className="text-blue-500 hover:text-blue-700"
        >
          View
        </button>
        <button
          onClick={() => removeTask(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </motion.div>
  );
}

export default ToDoItem;
