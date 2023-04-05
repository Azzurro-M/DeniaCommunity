import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import { useParams } from "next/navigation";

export default function resetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = router?.query?.token;
    console.log("token :>> ", token);
    token && setToken(token);
  }, [router.isReady]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `http://localhost:5000/api/user/resetpassword/${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, confirmPassword }),
      }
    );

    const data = await response.json();

    // Check if password reset was successful
    if (response.ok && data.success) {
      // Redirect to the login page
      alert("Password reset successful. Please login with your new password.");
      router.push("/login");
    } else {
      alert("Password reset failed. Please try again.");
    }
  };

  return (
    <>
      <form className="reset-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <label>
          New Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Reset Password</button>
      </form>
    </>
  );
}
