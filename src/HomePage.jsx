import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IronMan from "./IronMan";

function HomePage() {
  const navigate = useNavigate();

  // Load iSize from localStorage initially, default to 3
  const [iSize, setISize] = useState(() => {
    const saved = localStorage.getItem("ironman-size");
    return saved ? Number(saved) : 3;
  });

  // Save iSize to localStorage on change
  useEffect(() => {
    localStorage.setItem("ironman-size", iSize);
  }, [iSize]);

  function handleInputChange(e) {
    const val = Math.max(1, Number(e.target.value));
    setISize(val);
  }

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="number"
          value={iSize}
          min={1}
          onChange={handleInputChange}
        />
        <div style={{ display: "flex", gap: "20px", padding: "100px" }}>
          <IronMan size={iSize} storageKey="player1" />

          <div className="vr"/>

          <IronMan size={iSize} storageKey="player2" />
        </div>
        <div className="top-right">
          <button onClick={() => navigate("/login")} className="my-button">
            Login
          </button>
          <button onClick={() => navigate("/dashboard")} className="my-button">
            Dashboard
          </button>
        </div>
      </header>
    </div>
  );
}

export default HomePage;
