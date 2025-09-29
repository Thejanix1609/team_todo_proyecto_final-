import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (name !== "Usuario A" && name !== "Usuario B") {
      toast.error("Solo puedes entrar como Usuario A o Usuario B");
      return;
    }
    login(name);
    toast.success(`Bienvenido ${name}`);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Usuario A o Usuario B"
            className="w-full border p-2 rounded"
          />
          <button className="w-full bg-indigo-600 text-white py-2 rounded">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
