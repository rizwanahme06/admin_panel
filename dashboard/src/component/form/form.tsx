import React, { useState } from "react";
import "./form.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../context/Api";

type formErrors = {
  [key: string]: string;
};

const Form = () => {
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [role, setRole] = useState("");

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<formErrors>({});
  const [loading, setLoading] = useState(false);

  const {login, token} = useAuth();
  const navigate = useNavigate();

  // ---------------- VALIDATION ----------------
  const validateSignup = () => {
    const err: Record<string, string> = {};

    if (!name.trim()) err.name = "Name required";

    if (!email.trim()) {
      err.email = "Email required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      err.email = "Invalid email";
    }

    if (confirmEmail !== email) {
      err.confirmEmail = "Emails do not match";
    }

    if (!role) err.role = "Role required";

    return err;
  };

  // ---------------- LOGIN ----------------
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const data = await authFetch(
      "/connect",        // ✅ only endpoint
      null,              // ✅ NO token during login
      {
        method: "POST",
        body: JSON.stringify({ name, email }),
      }
    );

    if (data.status === "connect") {
      login({ user: data.user, token: data.token });
      navigate("/dashboard", { replace: true });
    } else {
      setMessage("❌ Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    setMessage("❌ Login failed");
  } finally {
    setLoading(false);
  }
};

  // ---------------- SIGNUP ----------------
 const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const validationErrors = validateSignup();
  if (Object.keys(validationErrors).length) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});
  setLoading(true);

  try {
    const data = await authFetch(
      "/users",
      token, // signup usually requires admin token
      {
        method: "POST",
        body: JSON.stringify({ name, email, role }),
      }
    );

    setMessage(data.message || "✅ User created successfully");
    setIsSignup(false);

    setName("");
    setEmail("");
    setConfirmEmail("");
    setRole("");
  } catch (error) {
    console.error(error);
    setMessage("❌ Signup failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="loginForm">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>

      <form onSubmit={isSignup ? handleSignup : handleLogin}>
        <label>
          Name
          <input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>

        <label>
          Email
          <input value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>

        {isSignup && (
          <>
            <label>
              Confirm Email
              <input
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
              {errors.confirmEmail && (
                <span className="error">{errors.confirmEmail}</span>
              )}
            </label>

            <label>
              Role
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {errors.role && <span className="error">{errors.role}</span>}
            </label>
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : isSignup ? "Register" : "Login"}
        </button>

        <p className="toggle">
          {isSignup ? (
            <>
              Already a user?{" "}
              <span onClick={() => setIsSignup(false)}>Login</span>
            </>
          ) : (
            <>
              New User?{" "}
              <span onClick={() => setIsSignup(true)}>Sign Up</span>
            </>
          )}
        </p>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Form;
