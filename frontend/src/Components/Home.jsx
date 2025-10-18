import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const name = localStorage.getItem("userName");
    if (!token) {
      navigate("/login");
    } else {
      setUser(name);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl mb-4">Welcome, {user || "Guest"} 🎉</h1>
      <p className="text-gray-700">You are now logged in.</p>
    </div>
  );
}
