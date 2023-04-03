import { useState } from "react";
import { useRouter } from "next/router";

export const emailReset = () => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = "";

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/forgotpassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        alert("An email has been sent to reset your password.");
      } else {
        alert(
          "Failed to send reset password email, make sure you email is registered with us."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2> Request your Reset Password Link!</h2>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
