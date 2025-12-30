// import { useNavigate } from "react-router-dom";

// export default function Forgot() {
//   const navigate = useNavigate();

//   return (
//     <div className="container">
//       <h2>Forgot Password</h2>
//       <input placeholder="Registered Email" />

//       <button onClick={() => navigate("/resetPW")}>Send Reset Link</button>
//       <button onClick={() => navigate("/login")}>Back to Login</button>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Forgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendResetLink = async () => {
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      const response = await axios.post(
        "https://terrorful-avah-bluishly.ngrok-free.dev/forgot-password",
        { email }
      );

      if (response.data.message === "Reset email sent") {
        setMessage("Reset email sent successfully 📧");
        setTimeout(() => navigate("/resetPW"), 2000); // navigate after 2 sec
      } else {
        setError(response.data.error || "Failed to send reset email");
      }
    } catch (err) {
      setError("Server not reachable or invalid request");
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>

      <input
        placeholder="Registered Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <button onClick={handleSendResetLink}>Send Reset Link</button>
      <button onClick={() => navigate("/login")}>Back to Login</button>
    </div>
  );
}









// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Forgot() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleForgot = async () => {
//     setError("");
//     setMessage("");

//     if (!email) {
//       setError("Please enter your registered email");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://terrorful-avah-bluishly.ngrok-free.dev/forgot-password",
//         {
//           email,
//           resetUrl: window.location.origin + "/resetPW",
//         }
//       );

//       if (response.data.message) {
//         setMessage("Reset link sent to your email 📧");
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || "Backend server not reachable");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Forgot Password</h2>

//       <input
//         type="email"
//         placeholder="Registered Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {message && <p style={{ color: "green" }}>{message}</p>}

//       <button onClick={handleForgot}>Send Reset Link</button>
//       <button onClick={() => navigate("/login")}>Back to Login</button>
//     </div>
//   );
// }
