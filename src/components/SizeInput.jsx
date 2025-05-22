function SizeInput({ size, onChange }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label htmlFor="ironSize">Number of Characters: </label>
      <input
        id="ironSize"
        type="number"
        min="1"
        max="86"
        value={size}
        onChange={onChange}
      />
    </div>
  );
}

export default SizeInput;
