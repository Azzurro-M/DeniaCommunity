import React from "react";
import { useState } from "react";
import axios from "axios";

export default function register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(name, email, password);
      const response = await axios.post("http://localhost:5000/api/user", {
        name,
        email,
        password,
      });
      setMessage("Welcome to the Community!");
      alert("Please Login to confirm your new account!");
    } catch (error) {
      setMessage("Error registering user");
      console.error(error);
    }
  };

  return (
    <div>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
        <p>{message}</p>
        <div></div>
      </form>
    </div>
  );
}
