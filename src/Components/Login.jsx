// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     if (!email || !password) {
//       alert("Please enter email and password");
//       return;
//     }

//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     const user = users.find(
//       (u) => u.email === email && u.password === password
//     );

//     if (!user) {
//       alert("User not found or wrong credentials");
//       return;
//     }

//     localStorage.setItem("currentUser", JSON.stringify(user));
//     navigate("/tasks");
//   };

//   return (
//     <div className="container">
//       <h2>Login</h2>

//       <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={handleLogin}>Login</button>

//       <div className="link" onClick={() => navigate("/register")}>
//         Create Account
//       </div>

//       <div className="link" onClick={() => navigate("/forgot")}>
//         Forgot Password?
//       </div>
//     </div>
//   );
// }





// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     if (!email || !password) {
//       alert("Please enter email and password");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "https://YOUR_NGROK_URL/login", // 🔴 replace with ngrok url
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email,
//             password,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         alert(data.error || "Login failed");
//         return;
//       }

//       // ✅ Save JWT tokens
//       localStorage.setItem("accessToken", data.access);
//       localStorage.setItem("refreshToken", data.refresh);

//       navigate("/tasks");
//     } catch (error) {
//       alert("Backend server not reachable");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Login</h2>

//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={handleLogin}>Login</button>

//       <div className="link" onClick={() => navigate("/register")}>
//         Create Account
//       </div>

//       <div className="link" onClick={() => navigate("/forgot")}>
//         Forgot Password?
//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://terrorful-avah-bluishly.ngrok-free.dev/login", // 🔴 replace with your ngrok
        { email, password }
      );

      // ✅ Check if login succeeded
      if (response.status === 200) {
        const data = response.data;

        // ✅ Save JWT tokens
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);

        // ✅ Save current user for Dashboard greeting
        localStorage.setItem("currentUser", JSON.stringify({ email: email }));

        navigate("/tasks"); // redirect to dashboard or tasks
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Backend server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <div
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => navigate("/register")}
      >
        Create Account
      </div>

      <div
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => navigate("/forgot")}
      >
        Forgot Password?
      </div>
    </div>
  );
}
