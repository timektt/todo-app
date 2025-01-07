import React from "react";
import ToDoItem from "./ToDoItem";

function ToDoList({ tasks, toggleComplete, removeTask }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found!</p>
      ) : (
        tasks.map((task) => (
          <ToDoItem
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            removeTask={removeTask}
          />
        ))
      )}
    </div>
  );
}

export default ToDoList;
