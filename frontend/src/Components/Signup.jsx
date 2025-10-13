import React, { useState } from "react";
import Navbar from "./Navbar";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setAlertMsg("");

    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! You can now login.");
        window.location.href = "/login";
      } else {
        setAlertMsg(data.message || "Signup failed");
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
          onSubmit={handleSignup}
          className="p-6 bg-white rounded shadow-md w-96 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>

          {alertMsg && (
            <p className="text-red-600 text-center font-semibold">{alertMsg}</p>
          )}

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
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
            Sign Up
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-700 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
