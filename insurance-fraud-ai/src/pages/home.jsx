import Dashboard from "../components/dashboard";
import About from "../components/about";
import { useEffect, useState } from "react";

const Home = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

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
          <a href="/story" className="primary-btn">Launch Detector</a>
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

    </div>
  );
};

export default Home;
