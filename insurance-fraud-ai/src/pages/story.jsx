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

  /* ===============================
     STORY ANALYSIS LOGIC (INLINE)
  =============================== */
  const analyzeStory = (text = "") => {
    if (!text.trim()) return 0;

    const story = text.toLowerCase();
    const words = story.split(/\s+/);
    const wordCount = words.length;
    let score = 0;

    // 1. Length score (30)
    if (wordCount >= 100) score += 30;
    else if (wordCount >= 60) score += 24;
    else if (wordCount >= 30) score += 15;
    else score += 5;

    // 2. Accident keywords (25)
    const keywords = [
      "accident",
      "crash",
      "hit",
      "collision",
      "damage",
      "injury",
      "brake",
      "road",
      "signal",
      "vehicle",
      "speed"
    ];

    let hits = 0;
    keywords.forEach((k) => {
      if (story.includes(k)) hits++;
    });

    if (hits >= 6) score += 25;
    else if (hits >= 4) score += 18;
    else if (hits >= 2) score += 10;

    // 3. Time & place realism (20)
    const timeWords = ["am", "pm", "morning", "evening", "night"];
    const placeWords = ["road", "junction", "highway", "signal", "bridge"];

    if (timeWords.some((t) => story.includes(t))) score += 10;
    if (placeWords.some((p) => story.includes(p))) score += 10;

    // 4. Generic / suspicious phrases (penalty)
    const suspicious = [
      "suddenly",
      "not my fault",
      "i dont know",
      "nothing happened",
      "unexpectedly"
    ];

    suspicious.forEach((s) => {
      if (story.includes(s)) score -= 8;
    });

    // 5. Repetition penalty
    const uniqueWords = new Set(words);
    const uniqueness = uniqueWords.size / wordCount;
    if (uniqueness < 0.45) score -= 10;

    // Clamp
    score = Math.max(0, Math.min(100, score));
    return Math.round(score);
  };

  /* ===============================
     HANDLERS
  =============================== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const storyProb = analyzeStory(form.description);

    // Store story
    localStorage.setItem("story", JSON.stringify(form));

    // Store / update result object
    const prevResult = JSON.parse(localStorage.getItem("result")) || {};
    localStorage.setItem(
      "result",
      JSON.stringify({
        ...prevResult,
        storyProb
      })
    );

    navigate("/analyze");
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

      {/* INPUT CARDS */}
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
        style={{ padding: "14px 28px", fontSize: "1rem" }}
        onClick={handleSubmit}
      >
        Analyze Claim
      </button>
    </div>
  );
};

export default Story;
