// export default function ChangePassword() {
//   return (
//     <div className="container">
//       <h2>Change Password</h2>
//       {/* <input placeholder="Email" /> */}
//       <input type="password" placeholder="Old Password" />
//       <input type="password" placeholder="New Password" />
//       <input type="password" placeholder="Confirm Password" />
//       <button>Update Password</button>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    setMessage("");
    setError("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken"); // JWT from login
      if (!token) {
        setError("You must be logged in to change password");
        return;
      }

      const response = await axios.post(
        "https://terrorful-avah-bluishly.ngrok-free.dev/change-password", // 🔴 Flask backend
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === "Password changed successfully") {
        setMessage("Password updated successfully 🎉");

        // Check if backend returned new tokens
        if (response.data.access && response.data.refresh) {
          localStorage.setItem("accessToken", response.data.access);
          localStorage.setItem("refreshToken", response.data.refresh);
          setTimeout(() => navigate("/tasks"), 2000);
        } else {
          // Backend invalidated tokens, logout required
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("currentUser");
          setTimeout(() => navigate("/login"), 2000);
        }
      } else {
        setError(response.data.error || "Failed to update password");
      }
    } catch (err) {
      setError("Server not reachable or invalid token");
    }
  };

  return (
    <div className="container">
      <h2>Change Password</h2>

      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
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

      <button onClick={handleChangePassword}>Update Password</button>
    </div>
  );
}
