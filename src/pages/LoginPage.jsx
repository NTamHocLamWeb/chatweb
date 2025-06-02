import React, { useState } from "react";
import { login } from "../api/authService";
import { startNotificationHub } from "../hubs/notificationHub";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { accessToken, refreshToken } = await login(email, password);

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // ✅ Kết nối tới hub ngay sau login
      startNotificationHub(accessToken, (message) => {
        alert("🔔 " + message);
      });

      // redirect user to dashboard...
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
