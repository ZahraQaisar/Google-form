import React, { useState } from "react";
import Navbar from "./Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlertMsg(""); // clear previous messages

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user?.name || "User"); // ✅ added line
        alert("Login successful!");
        window.location.href = "/";
      } else {
        setAlertMsg(data.message || "Login failed!");
      }
    } catch (err) {
      setAlertMsg("Server error, please try again later");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-base-200">
        <form
          onSubmit={handleLogin}
          className="p-6 bg-white rounded shadow-md w-96 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>

          {alertMsg && (
            <p className="text-red-600 text-center font-semibold">{alertMsg}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
          <p className="text-center">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-700 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
