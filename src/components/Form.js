import React from "react";
import { useState } from "react";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Important!
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      const result = await response.json();
      setStatus("Booking successful!");
      console.log("Server Response", result);
      setFormData({
        name: "",
        phoneNumber: "",
      });
    } catch (error) {
      setStatus("Error submitting form");
      console.error("Error:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h2>Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone Number:</label>
          <br />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>

        <button onClick={() => navigate("/mybookings")}>My Bookings</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};
export default Form;
