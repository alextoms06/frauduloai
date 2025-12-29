import { useEffect, useState } from "react";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("dashboardLogs");
    setLogs(raw ? JSON.parse(raw) : []);
  }, []);

  const total = logs.length;
  const real = logs.filter(l => l.verdict === "real accident").length;
  const fake = logs.filter(l => l.verdict === "fake claim").length;

  const avgStory = total
    ? Math.round(
        logs.reduce((s, l) => s + (l.storyProb || 0), 0) / total
      )
    : 0;

  const getFlags = (log) => {
    const flags = [];
    if (log.storyProb < 40) flags.push("very short or vague story");
    if (log.storyProb < 60) flags.push("missing time or location");
    if (log.imageProb < 70) flags.push("image confidence low");
    if (flags.length === 0) flags.push("sufficient detail and consistency");
    return flags;
  };

  // 👉 show only latest 3 unless expanded
  const visibleLogs = showAll ? logs : logs.slice(-3);

  return (
    <section className="dashboard-wrapper">

      <h1 className="dashboard-main-title">DASHBOARD</h1>

      <div className="card-grid">

        {/* OVERVIEW */}
        <div className="card">
          <h3>Overview</h3>
          <p>Total claims analyzed: <b>{total}</b></p>
          <p>Real accidents: <b>{real}</b></p>
          <p>Fake claims: <b>{fake}</b></p>
        </div>

        {/* STORY CONFIDENCE */}
        <div className="card">
          <h3>Story Confidence</h3>
          <p>
            Average story confidence: <b>{avgStory}%</b>
          </p>
          <p className="muted">
            Based on length, clarity, time & location presence
          </p>
        </div>

        {/* RECENT CLAIMS */}
        <div className="card">
          <h3>Recent Claims</h3>

          {logs.length === 0 ? (
            <p className="muted">No claims analyzed yet</p>
          ) : (
            <>
              <ul className="timeline">
                {visibleLogs
                  .slice()
                  .reverse()
                  .map((l, i) => (
                    <li key={i} className="timeline-item">
                      <b>{l.verdict}</b> — story {l.storyProb}%
                      <br />

                      <button
                        className="nerds-btn"
                        onClick={() =>
                          setOpenIndex(openIndex === i ? null : i)
                        }
                      >
                        Stats for nerds
                      </button>

                      {openIndex === i && (
                        <ul className="nerds-box">
                          {getFlags(l).map((f, idx) => (
                            <li key={idx}>• {f}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
              </ul>

              {logs.length > 3 && (
                <button
                  className="read-more-btn"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Show less" : "Read more"}
                </button>
              )}
            </>
          )}
        </div>

      </div>
    </section>
  );
};

export default Dashboard;
