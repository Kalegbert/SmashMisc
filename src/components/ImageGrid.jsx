import { useState } from 'react';

function ImageGrid({ images }) {
  const [overlayToggles, setOverlayToggles] = useState(Array(images.length).fill(false));
  const imagesPerRow = 5;

  const toggleOverlay = (index) => {
    setOverlayToggles((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  // Break images into rows
  const rows = [];
  for (let i = 0; i < images.length; i += imagesPerRow) {
    rows.push(images.slice(i, i + imagesPerRow));
  }

  return (
    <div style={{ marginTop: '10px' }}>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '10px',
            flexWrap: 'nowrap',
          }}
        >
          {row.map((img, index) => {
            const absoluteIndex = rowIndex * imagesPerRow + index;
            return (
              <div
                key={absoluteIndex}
                style={{ position: 'relative', width: '100px', height: '100px', cursor: 'pointer' }}
                onClick={() => toggleOverlay(absoluteIndex)}
                className="image-wrapper"
              >
                <img
                  src={img}
                  alt={`Random ${absoluteIndex + 1}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  className="nice-border"
                />
                {overlayToggles[absoluteIndex] && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 3,
                      left: 3,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '7px',
                    }}
                  >
                    <img
                      src={require('./images/x-out.png')}
                      alt="Overlay"
                      style={{
                        width: '87%',
                        height: '87%',
                        objectFit: 'contain',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;
