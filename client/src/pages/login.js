import { useState } from "react";
import { useRouter } from "next/router";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Check if authentication was successful
      if (response.ok && data && data.token) {
        // Redirect to the home page
        router.push("/");
      } else {
        // Redirect to the login page
        alert("Wrong Credentials");
        router.push("/register");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    router.push("/emailReset");
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2> Already a member?</h2>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <button className="submit" type="submit">Log in</button>
      </form>
      <div className="reset">
        <button onClick={handleResetPassword}>Reset Password</button>
      </div>
    </>
  );
}
