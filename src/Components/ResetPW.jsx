// export default function ResetPassword() {
//   return (
//     <div className="container">
//       <h2>Reset Password</h2>
//       <input type="password" placeholder="New Password" />
//       <input type="password" placeholder="Confirm Password" />
//       <button>Reset</button>
//     </div>
//   );
// }



import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams(); // token from URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    setMessage("");
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://terrorful-avah-bluishly.ngrok-free.dev/reset-password",
        { token, password: newPassword }
      );

      if (response.data.message === "Password reset successful") {
        setMessage("Password reset successfully 🎉");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.data.error || "Failed to reset password");
      }
    } catch (err) {
      setError("Server not reachable or token invalid/expired");
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <button onClick={handleResetPassword}>Reset</button>
    </div>
  );
}
