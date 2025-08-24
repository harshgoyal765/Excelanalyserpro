import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { registerUser } from "../services/api";

const SignupForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    city: "",
    country: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // start loading

    try {
      const response = await registerUser(formData);
      console.log("✅ FormData sent to backend:", formData);
      console.log("✅ Backend response:", response);

      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        city: "",
        country: "",
        state: "",
        pincode: "",
      });

      if (response.status === 201) {
        alert("Signup successful! Go to Signin...");
        navigate("/sign-in");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      console.error("❌ Error details:", err.response?.data || err.message);

      if (
        err.response?.status === 400 &&
        err.response.data === "User already exists"
      ) {
        setError("This email is already registered. Try signing in.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false); // stop loading
    }
  };

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[15px] bg-white overflow-y-auto max-h-full p-[10px]"
    >
      <h3 className="text-xl font-semibold mb-4">Signup</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* All inputs remain same as your original code */}
        {/* ... */}
      </div>

      <button
        type="submit"
        disabled={loading} // disable during loading
        className="mt-6 w-full bg-gradient-to-r from-[#030d46] to-[#06eaea] text-white py-2 px-4 hover:opacity-50 transition duration-300 rounded-2xl flex justify-center items-center"
      >
        {loading ? <ClipLoader size={24} color="#fff" /> : "Sign Up"}
      </button>
      {error && <div className="text-red-600 font-medium mt-2">{error}</div>}
    </form>
  );
};

export default SignupForm;
