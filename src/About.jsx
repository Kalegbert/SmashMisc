import { useNavigate } from 'react-router-dom';
import './App.css';
import Leaderboard from './components/leaderboard';

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex', gap: '20px' }}>
          <Leaderboard />
          <div></div>
          <div className="top-right">
            <button onClick={() => navigate("/dashboard")} className="my-button">
              Dashboard
            </button>

          </div>
        </div>
      </header>
    </div>
  );
}

export default AboutPage;