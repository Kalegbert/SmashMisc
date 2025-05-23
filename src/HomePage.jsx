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

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow empty string (user is deleting)
    if (value === '') {
      setISize('');
      return;
    }

    // Parse number and restrict to 1–86
    const number = parseInt(value, 10);
    if (number >= 1 && number <= 86) {
      setISize(number);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <input
          type="number"
          value={iSize}
          min={1}
          max={86}
          onChange={handleInputChange}
        />
        <div className="button-caption">Number of characters</div>
        <div style={{ display: "flex", gap: "20px", padding: "100px" }}>
          <IronMan size={iSize} storageKey="player1" />

          <div className="vr" />

          <IronMan size={iSize} storageKey="player2" />
        </div>
        <div className="top-right">
          <button onClick={() => navigate("/dashboard")} className="my-button">
            Dashboard
          </button>

        </div>
      </header>
    </div>
  );
}

export default HomePage;
