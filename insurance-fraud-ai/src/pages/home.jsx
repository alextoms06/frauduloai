import Dashboard from "../components/dashboard";
import About from "../components/about";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [animate, setAnimate] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleLaunch = () => setShowPopup(true);
  const handleUnderstand = () => {
    setShowPopup(false);
    navigate("/story");
  };

  return (
    <div className={`home ${animate ? "fade-in" : ""}`}>

      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">FrauduloAI</h1>
        <p className="hero-subtitle">
          Revolutionizing fraud detection, one story at a time.
          <br />
          Launch detector to get started.
        </p>

        <div className="hero-actions">
          <button className="primary-btn" onClick={handleLaunch}>
            Launch Detector
          </button>
          <a href="#dashboard" className="secondary-btn">Dashboard</a>
          <a href="#about" className="secondary-btn">About</a>
        </div>
      </section>

      {/* DASHBOARD */}
      <section id="dashboard" className="section">
        <h2 className="section-title">DASHBOARD</h2>
        <Dashboard />
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <h2 className="section-title">ABOUT FRAUDULOAI</h2>
        <About />
      </section>

      {/* ========================= POPUP ========================= */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "28px",
              padding: "40px",
              maxWidth: "800px",
              width: "90%",
              boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', Helvetica, Arial, sans-serif",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
              Precautionary Warning
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.6 }}>
              Insurance fraud is a criminal offense under Indian law. Falsifying
              accident claims, submitting false documents, or misrepresenting
              facts can result in severe penalties, including imprisonment and
              fines.
            </p>
            <ul style={{ marginTop: "10px", fontSize: "0.95rem", lineHeight: 1.5 }}>
              <li>Indian Penal Code Sections 420 & 468 – Cheating & Forgery</li>
              <li>Motor Vehicles Act – False insurance claims</li>
              <li>Constitutional provisions on fraud & criminal liability</li>
              <li>Penalties may include jail time and monetary fines</li>
            </ul>
            <button
              className="primary-btn"
              style={{ marginTop: "20px", width: "100%", padding: "16px", fontSize: "1rem" }}
              onClick={handleUnderstand}
            >
              I Understand
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
