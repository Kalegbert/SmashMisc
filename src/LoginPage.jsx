import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockUsers = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'guest', password: '1234', role: 'user' }
];

export default function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button style={{ marginTop: '1rem' }} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
