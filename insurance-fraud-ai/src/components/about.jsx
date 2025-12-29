import alexPic from "../assets/alex.jpg";

const About = () => {
  return (
    <div className="card-grid">

      <div className="card">
        <h3 className="about-title">WHAT IS FRAUDULOAI?</h3>
        <p className="about-text">
          FrauduloAI is an explainable AI-powered system designed to verify the
          authenticity of insurance accident claims. It combines structured
          accident-story analysis with visual crash assessment to distinguish
          genuine claims from potentially fraudulent ones — fast, transparent,
          and reliable.
        </p>
      </div>

      <div className="card">
        <h3 className="about-title">WHO CAN USE FRAUDULOAI?</h3>
        <p className="about-text">
          FrauduloAI is built for insurance agents — not claimants. Agents rely on
          accuracy for fair commissions and honest case handling. This tool
          empowers them to validate claims confidently, reduce fraud, and speed
          up genuine approvals.
        </p>
      </div>

      <div className="card">
        <h3 className="about-title">THE SPARK</h3>
        <p className="about-text">
          The idea was inspired by a real-life incident experienced by our
          founder in Trivandrum, where a car deliberately braked in front of the
          auto-rickshaw he was traveling in. Despite no fault, the driver was
          falsely booked for rash driving — revealing how easily systems can be
          exploited.
        </p>
      </div>

      <div className="card team-card">
        <h3 className="about-title">MEET THE TEAM</h3>

        <img
          src={alexPic}
          alt="Alex Thomas"
          className="team-photo"
        />

        <p className="about-text">
          <b>Alex Thomas</b><br />
          Mar Athanasius College of Engineering, Kothamangalam
        </p>

        <a
          href="https://www.linkedin.com/in/alex-thomas-83bb79281"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin-link"
        >
          View LinkedIn Profile
        </a>
      </div>

    </div>
  );
};

export default About;
