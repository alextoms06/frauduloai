import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Story = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    contact: "",
    vehicle: "",
    datetime: "",
    address: "",
    profession: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    localStorage.setItem("story", JSON.stringify(form));
    navigate("/analyze"); // keep your existing flow
  };

  return (
    <div className="page" style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "700",
          marginBottom: "40px",
          letterSpacing: "-0.02em"
        }}
      >
        Accident Description
      </h1>

      {/* CARD */}
      {[
        { label: "Claimant Name", name: "fullName", type: "text" },
        { label: "Contact Number", name: "contact", type: "text" },
        { label: "Vehicle Details", name: "vehicle", type: "text" },
        { label: "Date & Time of Accident", name: "datetime", type: "datetime-local" },
        { label: "Accident Location / Address", name: "address", type: "text" },
        { label: "Profession", name: "profession", type: "text" }
      ].map((field) => (
        <div
          key={field.name}
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "20px 24px",
            marginBottom: "20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
          }}
        >
          <label
            style={{
              display: "block",
              fontSize: "0.9rem",
              fontWeight: "600",
              marginBottom: "8px",
              color: "#444"
            }}
          >
            {field.label}
          </label>

          <input
            type={field.type}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "1.05rem",
              background: "transparent"
            }}
          />
        </div>
      ))}

      {/* DESCRIPTION CARD */}
      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          padding: "20px 24px",
          marginBottom: "30px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
        }}
      >
        <label
          style={{
            display: "block",
            fontSize: "0.9rem",
            fontWeight: "600",
            marginBottom: "8px",
            color: "#444"
          }}
        >
          Detailed Accident Description
        </label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            fontSize: "1.05rem",
            resize: "none"
          }}
        />
      </div>

      <button
        className="button"
        style={{
          padding: "14px 28px",
          fontSize: "1rem"
        }}
        onClick={handleSubmit}
      >
        Analyze Claim
      </button>
    </div>
  );
};

export default Story;
