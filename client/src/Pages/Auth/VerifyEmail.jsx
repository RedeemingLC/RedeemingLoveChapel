import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../utils/api";
import styles from "./Auth.module.css";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const verifyEmail = async () => {
      if (!token) {
        if (isMounted) {
          setStatus("error");
          setMessage("The verification link is invalid.");
        }

        return;
      }

      try {
        const { data } = await api.get(`/auth/verify-email/${token}`);

        if (!isMounted) return;

        setStatus("success");
        setMessage(data?.message || "Email verified successfully");
      } catch (err) {
        if (!isMounted) return;

        setStatus("error");
        setMessage(
          err?.response?.data?.message ||
            "Verification link is invalid or expired",
        );
      }
    };

    verifyEmail();

    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {status === "loading" && <p role="status">Verifying your email...</p>}

        {status === "success" && (
          <>
            <h2>Email Verified 🎉</h2>

            <p role="status">{message}</p>

            <button type="button" onClick={() => navigate("/login")}>
              Proceed to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h2>Verification Failed ❌</h2>

            <p role="alert">{message}</p>

            <button type="button" onClick={() => navigate("/register")}>
              Create Account Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
