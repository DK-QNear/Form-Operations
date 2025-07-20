import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css'; 

const Login = () => {
    const [formData, setFormData] = React.useState({ email: '' , password: ''});
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setFormData({
            ...formData, [e.target.name]: e.target.value});
    }

    const handleLogin = async e =>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if(response.ok){
                const data = await response.json();
                console.log("Login successful", data);
                localStorage.setItem("token", data.token); // Store token in localStorag
                navigate('/form'); // Redirect to form page on successful login
            }else{
                alert(" Invalid credentials, please try again."); // Alert user on failure
            }
        }catch(err){
            console.error("Login failed", err);
        }
    }
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" name="email"  onChange={handleChange} value={formData.email} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button> <br />
        <button type="button" onClick={() => navigate('/register')} >Register</button>
      </form>
    </div>
  );
};

export default Login;
