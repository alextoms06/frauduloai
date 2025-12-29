import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Analyze = () => {
  const navigate = useNavigate();

  const [storyData, setStoryData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCrash, setSelectedCrash] = useState(null);
  const [imageProb, setImageProb] = useState(null);

  useEffect(() => {
    const storedStory = JSON.parse(localStorage.getItem("story"));
    if (!storedStory) {
      navigate("/story");
      return;
    }
    setStoryData(storedStory);
  }, [navigate]);

  const handleCrashSelect = (type) => {
    setSelectedCrash(type);
    setImageProb(type === "major" ? 80 : 40); // only for later result calculation
  };

  const handleNext = () => {
    if (!selectedCrash) return;
    setLoading(true);

    const result = {
      storyProb: JSON.parse(localStorage.getItem("result"))?.storyProb || 0,
      imageProb,
      verdict: selectedCrash === "major" ? "genuine claim" : "possible fake",
    };

    localStorage.setItem("result", JSON.stringify(result));
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
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #c7f0d0, #64b96f)",
        padding: "20px",
      }}
    >
      <div
        className="card"
        style={{
          textAlign: "center",
          padding: "40px",
          borderRadius: "25px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          backgroundColor: "#ffffff",
        }}
      >
        <h1
          className="title"
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "30px",
          }}
        >
          Upload Accident Image
        </h1>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          style={{
            marginBottom: "40px",
            padding: "10px",
            borderRadius: "15px",
            border: "1px solid #ccc",
            outline: "none",
            width: "100%",
            cursor: "pointer",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <button
            className={`apple-btn ${selectedCrash === "major" ? "selected" : ""}`}
            onClick={() => handleCrashSelect("major")}
          >
            Major Crash
          </button>
          <button
            className={`apple-btn ${selectedCrash === "minor" ? "selected" : ""}`}
            onClick={() => handleCrashSelect("minor")}
          >
            Minor Scratch
          </button>
        </div>

        <button
          className="apple-btn next-btn"
          onClick={handleNext}
          disabled={!selectedCrash || loading}
        >
          {loading ? "Processing..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Analyze;
