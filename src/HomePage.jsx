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
        <footer className="footer">
          <a
            className="App-link"
            href="https://github.com/Kalegbert"
            target="_blank"
            rel="noopener noreferrer"
          >
            My Github
          </a>
          <div style={{ marginTop: "1rem" }}>
            <button onClick={() => navigate("/about")} className="my-button">
              Go to About Page
            </button>
            <button onClick={() => navigate("/login")} className="my-button">
              Login
            </button>
            <button onClick={() => navigate("/dashboard")} className="my-button">
              Dashboard
            </button>
          </div>
        </footer>
      </header>
    </div>
  );
}

export default HomePage;