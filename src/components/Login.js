import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Component.css";
const tokens = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNzc2NTU1MiwiZXhwIjoxNzQ5MzAxNTUyfQ.z1FBx3TE1xN2DDkZ_udVFGf5jmyCjbi0TSasTJVY0CA"

const Login = () => {
 
  const [phone, setPhone] = useState("");
  const [parol, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
	e.preventDefault();
	try {
	  const response = await fetch(
		"https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin", 
		{
		  method: "POST",
		  body: JSON.stringify({
			phone_number: phone, 
			password: parol, 
		  }),
		  headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + tokens 
			
		  },
		  
		}
	  );
  
	  if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      
      
      navigate("/list");

    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="phone">Login</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e?.target?.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="parol">Password</label>
          <input
            type="parol"
            id="parol"
            value={parol}
            onChange={(e) => setPassword(e?.target?.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;