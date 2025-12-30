import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const [result, setResult] = useState(null);
  const [storyData, setStoryData] = useState({});
  const [verdict, setVerdict] = useState("");
  const [showStats, setShowStats] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResult = JSON.parse(localStorage.getItem("result"));
    const storedStory = JSON.parse(localStorage.getItem("story"));

    if (!storedResult || !storedStory) {
      navigate("/story");
      return;
    }

    const storyProb = Number(storedResult.storyProb ?? 0);
    const imageProb = Number(storedResult.imageProb ?? 0);

    let finalVerdict = "Possible Fake / Minor Damage";
    if (storyProb < 40) finalVerdict = "fake claim";
    else if (imageProb >= 70) finalVerdict = "real accident";

    setResult({ storyProb, imageProb });
    setStoryData(storedStory);
    setVerdict(finalVerdict);

    const existing =
      JSON.parse(localStorage.getItem("dashboardLogs")) || [];

    existing.push({
      verdict: finalVerdict,
      storyProb,
      imageProb,
      timestamp: Date.now(),
    });

    localStorage.setItem(
      "dashboardLogs",
      JSON.stringify(existing)
    );
  }, [navigate]);

  if (!result) return null;

  const { storyProb, imageProb } = result;
  const isFake = verdict === "fake claim";
  const isReal = verdict === "real accident";

  const handleGenerateCertificate = () => {
    const w = window.open("", "_blank");
    w.document.write(`
      <html>
        <head><title>Insurance Certificate</title></head>
        <body style="font-family:sans-serif; padding:20px;">
          <h1 style="color:#1a7f37;">APPROVED</h1>
          <h2>Insurance Claim Details</h2>
          <p><strong>Name:</strong> ${storyData.fullName || "N/A"}</p>
          <p><strong>Vehicle:</strong> ${storyData.vehicle || "N/A"}</p>
          <p><strong>Date:</strong> ${storyData.datetime || "N/A"}</p>
          <hr/>
          <p><strong>Story Confidence:</strong> ${storyProb}%</p>
          <p><strong>Image Confidence:</strong> ${imageProb}%</p>
        </body>
      </html>
    `);
    w.print();
  };

  return (
    <div
      className="result-page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: "520px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.2rem", marginBottom: "12px" }}>
          Claim Analysis Result
        </h1>

        <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
          <strong>Verdict:</strong>{" "}
          <span
            style={{
              color: isReal
                ? "#1a7f37"
                : isFake
                ? "#b42318"
                : "#9a6700",
            }}
          >
            {verdict}
          </span>
        </p>

        <button
          className="apple-btn"
          onClick={() => setShowStats(!showStats)}
        >
          {showStats ? "Hide details" : "Stats for nerds"}
        </button>

        {showStats && (
          <div style={{ marginTop: "20px", fontSize: "0.95rem" }}>
            <p>Story Probability: {storyProb}%</p>
            <p>Image Probability: {imageProb}%</p>
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "14px",
            justifyContent: "center",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          {isReal && (
            <button
              className="apple-btn primary"
              onClick={handleGenerateCertificate}
            >
              Generate Certificate
            </button>
          )}

          <button
            className="apple-btn ghost"
            onClick={() => navigate("/")}
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
