import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import apiRequest from "../../../utils/apiRequest";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const telephone = formData.get("telephone");
    const role = formData.get("role");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        firstname,
        lastname,
        telephone,
        role,
        password,
      });

      navigate("/confirm-email", { state: { username } });
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="firstname" type="text" placeholder="Firstname" />
          <input name="lastname" type="text" placeholder="Lastname" />
          <input name="telephone" type="text" placeholder="Phone" />
          <select name="role" required>
            <option value="">Select Role</option>
            <option value="MANAGER">Admin</option>
            <option value="USER">User</option>
          </select>
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?Login</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.jpg" alt="" />
      </div>
    </div>
  );
}

export default Register;
