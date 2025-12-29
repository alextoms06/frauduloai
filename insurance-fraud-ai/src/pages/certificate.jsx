import React from "react";

const Certificate = () => {
  const result = JSON.parse(localStorage.getItem("result"));
  const victimName = localStorage.getItem("victimName"); // we’ll store this
  const today = new Date().toLocaleDateString();

  const avgProbability = (result.imageProb + result.storyProb) / 2;

  const downloadCertificate = () => {
    const content = document.getElementById("certificate").innerText;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Insurance_Application_Certificate.txt";
    link.click();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div
        id="certificate"
        style={{
          border: "2px solid black",
          padding: "2rem",
          maxWidth: "700px",
          margin: "auto",
          background: "#fff"
        }}
      >
        <h2 style={{ textAlign: "center" }}>INSURANCE APPLICATION CERTIFICATE</h2>

        <p>Date: {today}</p>

        <p>
          This is to certify that <strong>{victimName}</strong> has submitted an
          insurance claim for a reported road accident.
        </p>

        <p>
          The incident was analyzed using AI-based accident verification
          techniques, including image analysis and incident narrative
          validation.
        </p>

        <p>
          <strong>Accident Probability Score:</strong> {avgProbability}%
        </p>

        {avgProbability >= 80 && (
          <h3 style={{ color: "red", textAlign: "center" }}>APPROVED</h3>
        )}

        <p>
          This certificate is generated digitally and is valid for insurance
          processing purposes.
        </p>

        <p style={{ marginTop: "3rem" }}>
          Authorized System<br />
          Insurance Fraud AI
        </p>
      </div>

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <button onClick={downloadCertificate}>
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default Certificate;
