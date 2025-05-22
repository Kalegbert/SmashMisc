import { useNavigate } from 'react-router-dom';
import './App.css';

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex', gap: '20px' }}>
      <button onClick={() => navigate('/')} className="my-button">Go Back Home</button>
      </div>
      </header>
    </div>
  );
}

export default AboutPage;