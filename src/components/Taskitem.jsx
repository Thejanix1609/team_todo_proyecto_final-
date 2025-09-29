import React, { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleSave = () => {
    if (!newText.trim()) return;
    onEdit(task.id, newText.trim());
    setIsEditing(false);
  };

  return (
    <div
      className={`flex items-center justify-between bg-white p-3 rounded shadow ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex-1">
        <div className="text-sm text-gray-500">Autor: {task.author}</div>
        {isEditing ? (
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="border rounded p-1 w-full"
          />
        ) : (
          <div
            className={`font-medium ${
              task.completed ? "line-through" : ""
            }`}
          >
            {task.text}
          </div>
        )}
      </div>

      <div className="flex gap-2 ml-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Guardar
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setNewText(task.text);
              }}
              className="px-3 py-1 bg-gray-400 text-white rounded"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 rounded border"
            >
              Editar
            </button>
            <button
              onClick={() => onToggle(task.id)}
              className="px-3 py-1 rounded border"
            >
              {task.completed ? "Desmarcar" : "Completar"}
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="px-3 py-1 rounded bg-red-500 text-white"
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
