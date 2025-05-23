import { useNavigate } from 'react-router-dom';
import './App.css';

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex', gap: '20px' }}>
          <a>
            Nothing yet
          </a>
          <div></div>
      <button onClick={() => navigate('/dashboard')} className="my-button">Back to dashboard</button>
      </div>
      </header>
    </div>
  );
}

export default AboutPage;