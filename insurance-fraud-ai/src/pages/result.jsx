import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const [result, setResult] = useState(null);
  const [storyData, setStoryData] = useState({});
  const [showStats, setShowStats] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResult = JSON.parse(localStorage.getItem("result"));
    const storedStory = JSON.parse(localStorage.getItem("story"));
    if (!storedResult || !storedStory) {
      navigate("/story");
      return;
    }
    setResult(storedResult);
    setStoryData(storedStory);
  }, [navigate]);

  if (!result) return null;

  const { storyProb, imageProb } = result;
  const isFakeStory = storyProb < 40;
  const isMajorCrash = imageProb >= 70;

  const handleGenerateCertificate = () => {
    const certificateWindow = window.open("", "_blank");
    certificateWindow.document.write(`
      <html>
        <head><title>Insurance Certificate</title></head>
        <body style="font-family:sans-serif; padding: 20px;">
          <h1 style="color:red;">APPROVED</h1>
          <h2>Insurance Claim Details</h2>
          <p><strong>Name:</strong> ${storyData.fullName || "N/A"}</p>
          <p><strong>Contact Number:</strong> ${storyData.contact || "N/A"}</p>
          <p><strong>Vehicle Number:</strong> ${storyData.vehicle || "N/A"}</p>
          <p><strong>Date & Time:</strong> ${storyData.datetime || "N/A"}</p>
          <p><strong>Address:</strong> ${storyData.address || "N/A"}</p>
          <p><strong>Profession:</strong> ${storyData.profession || "N/A"}</p>
          <p><strong>Accident Description:</strong> ${storyData.description || "N/A"}</p>
          <p><strong>Story Confidence:</strong> ${storyProb}%</p>
          <p><strong>Image Confidence:</strong> ${imageProb !== null ? imageProb + "%" : "N/A"}</p>
        </body>
      </html>
    `);
    certificateWindow.print();
  };

  return (
    <div
      className="page"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #FFD700, #FFFACD)",
        padding: "20px",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      {/* Verdict Card */}
      <div
        className="card"
        style={{
          padding: "30px",
          borderRadius: "25px",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "20px" }}>
          Claim Analysis Result
        </h1>
        <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
          <strong>Verdict:</strong>{" "}
          {isFakeStory
            ? "Fake Claim"
            : isMajorCrash
            ? "Genuine Claim"
            : "Possible Fake / Minor Damage"}
        </p>
      </div>

      {/* Stats Card */}
      <div
        className="card"
        style={{
          padding: "25px",
          borderRadius: "25px",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        <button
          className="apple-btn"
          style={{ marginBottom: "15px" }}
          onClick={() => setShowStats(!showStats)}
        >
          Want to know?
        </button>

        {showStats && (
          <div style={{ marginTop: "15px" }}>
            <p style={{ fontSize: "1rem" }}>Story Probability: {storyProb}%</p>
            {imageProb !== null && <p style={{ fontSize: "1rem" }}>Image Probability: {imageProb}%</p>}
            <p style={{ fontSize: "1rem", marginTop: "10px" }}>
              Why Flagged: {isFakeStory ? "Too short or missing details" : "Review image for minor/major crash"}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {isMajorCrash && !isFakeStory && (
          <button className="apple-btn" onClick={handleGenerateCertificate}>
            Generate Insurance Certificate
          </button>
        )}
        <button className="apple-btn ghost" onClick={() => navigate("/")}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Result;
