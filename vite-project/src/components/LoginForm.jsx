// src/components/LoginForm.jsx
import { useState } from "react";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleLogin} className="space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2">Login</button>
      </form>
      <button onClick={handleLogout} className="mt-4 text-red-500">
        Logout
      </button>
    </div>
  );
}
