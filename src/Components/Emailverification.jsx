// import { useNavigate } from "react-router-dom";

// export default function Emailverification() {
//   const navigate = useNavigate();

//   return (
//     <div className="container">
//       <h2>Email Verification</h2>
//       <p>Click below to verify your email</p>

//       <button onClick={() => navigate("/")}>Verify Email</button>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Emailverification() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying email...");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Invalid verification link");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `https://terrorful-avah-bluishly.ngrok-free.dev/verify/${token}` // ✅ Flask backend
        );

        if (!response.ok) {
          setError("Verification failed or link expired");
          return;
        }

        const text = await response.text(); // ✅ backend returns plain text

        if (text === "Email verified successfully") {
          setMessage("Email verified successfully 🎉");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setError(text || "Verification failed");
        }
      } catch (err) {
        setError("Backend server not reachable");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="container">
      <h2>Email Verification</h2>

      {error ? <p style={{ color: "red" }}>{error}</p> : <p>{message}</p>}

      <button onClick={() => navigate("/login")}>Go to Login</button>
    </div>
  );
}
