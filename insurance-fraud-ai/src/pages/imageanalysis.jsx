import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ImageAnalysis = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null); // 'major' or 'minor'
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSelection = (type) => {
    setSelected(type);
  };

  const handleNext = () => {
    if (!selected) return alert("Please select Major or Minor crash");
    setLoading(true);

    // Store the selection in localStorage for result page
    const storedResult = JSON.parse(localStorage.getItem("result")) || {};
    storedResult.imageProb = selected === "major" ? 80 : 40; // Major -> high, Minor -> low
    localStorage.setItem("result", JSON.stringify(storedResult));

    setTimeout(() => {
      setLoading(false);
      navigate("/result");
    }, 500);
  };

  return (
    <div
      className="page"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
        background: "linear-gradient(to bottom, #90ee90, #32cd32)",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "20px" }}>
        Upload Image
      </h1>

      {/* File input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{
          padding: "15px",
          borderRadius: "15px",
          border: "2px dashed #1d1d1f",
          cursor: "pointer",
          textAlign: "center",
          fontSize: "1rem",
        }}
      />

      {/* Major/Minor crash buttons */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <button
          className={`apple-btn ${selected === "major" ? "selected" : ""}`}
          onClick={() => handleSelection("major")}
        >
          Major Crash
        </button>
        <button
          className={`apple-btn ${selected === "minor" ? "selected" : ""}`}
          onClick={() => handleSelection("minor")}
        >
          Minor Scratch
        </button>
      </div>

      {/* Next Button */}
      <button
        className="apple-btn"
        style={{ marginTop: "20px", minWidth: "150px" }}
        onClick={handleNext}
      >
        {loading ? "Processing..." : "Next"}
      </button>
    </div>
  );
};

export default ImageAnalysis;
