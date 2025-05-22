import { useNavigate } from "react-router-dom";
import IronMan from "./IronMan"; // assuming this is your component

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex", gap: "20px", padding: "100px" }}>
          <IronMan />
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