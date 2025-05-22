import { useEffect, useState } from 'react';
import './App.css';



export default function Testing() {

  const [text, setText] = useState(() => {
    return String(localStorage.getItem('testing-var')) || "Swag";
  });

  // Save size whenever it changes
  useEffect(() => {
    localStorage.setItem('testing-var', text);
  }, [text]);


  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* <h1>{text}</h1> */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
        style={{ fontSize: '16px', padding: '8px' }}
        className="input-box"
      />
    </div>
  );

}