import React, { useState } from "react";

function ToDoForm({ addTask }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Add a new task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-2 border rounded bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </form>
  );
}

export default ToDoForm;
