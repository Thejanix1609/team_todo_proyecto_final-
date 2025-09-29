import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import SearchBar from "./SearchBar";

const TASKS_KEY = "team-todo-tasks";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Estado de tareas
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(TASKS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [query, setQuery] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

  // Guardar tareas en localStorage
  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Funciones de tareas
  const addTask = (text) => {
    if (!user) return toast.error("Debes iniciar sesión");
    const newTask = {
      id: Date.now().toString(),
      author: user,
      text,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    toast.success("Tarea agregada");
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.info("Tarea eliminada");
  };

  const editTask = (id, newText) => {
  setTasks((prev) =>
    prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
  );
};


  // Filtrar
  const filtered = tasks.filter((t) => {
    const matchesQuery =
      t.author.toLowerCase().includes(query.toLowerCase()) ||
      t.text.toLowerCase().includes(query.toLowerCase());
    const matchesCompleted = showCompleted ? true : !t.completed;
    return matchesQuery && matchesCompleted;
  });

  const handleLogout = () => {
    logout();
    toast.info("Sesión cerrada");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Team To-Do</h1>
        <div>
          <span className="mr-4 font-semibold">Usuario: {user}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Barra de búsqueda */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
      />

      {/* Formulario de nueva tarea */}
      <TaskForm onAdd={addTask} />

      {/* Lista de tareas */}
      <TaskList
  tasks={filtered}
  onToggle={toggleComplete}
  onDelete={deleteTask}
  onEdit={editTask}
/>


      
    </div>
  );
}
