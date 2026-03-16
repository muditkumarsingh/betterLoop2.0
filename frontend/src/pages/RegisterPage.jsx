import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../services/api";

function RegisterPage() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
        navigate("/dashboard");
    }

  }, []);
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register", {
        username,
        email,
        password
      });

      alert("Registration successful");

      navigate("/login");

    } catch (error) {

      alert("Registration failed");

    }

  };

  return (
    <div>

      <h2>Register</h2>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <br/><br/>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br/><br/>

        <button type="submit">Register</button>

      </form>

    </div>
  );

}

export default RegisterPage;