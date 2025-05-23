const leaderboardData = [
  { name: 'Alice', score: 120 },
  { name: 'Bob', score: 110 },
  { name: 'Charlie', score: 95 },
  { name: 'David', score: 85 },
];

export default function Leaderboard() {
  const sortedData = [...leaderboardData].sort((a, b) => b.score - a.score);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Leaderboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#FF0000' }}>
            <th style={cellStyle}>Rank</th>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((entry, index) => (
            <tr key={index} style={{ textAlign: 'center' }}>
              <td style={cellStyle}>{index + 1}</td>
              <td style={cellStyle}>{entry.name}</td>
              <td style={cellStyle}>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  padding: '0.75rem',
  border: '1px solid #ddd',
};
