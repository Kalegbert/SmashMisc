import { useState } from 'react';
import '../App.css'; // Assuming your CSS classes are defined here

function ImageGrid({ images }) {
  const [overlayToggles, setOverlayToggles] = useState(Array(images.length).fill(false));
  const imagesPerRow = 5; // This will now act as a maximum for desktop, will wrap on mobile

  const toggleOverlay = (index) => {
    setOverlayToggles((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  // Break images into rows (still useful for initial grouping, but flex-wrap handles actual layout)
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
            flexWrap: 'wrap', 
          }}
        >
          {row.map((img, index) => {
            const absoluteIndex = rowIndex * imagesPerRow + index;
            return (
              <div
                key={absoluteIndex}

                onClick={() => toggleOverlay(absoluteIndex)}
                className="image-wrapper"
              >
                <img
                  src={img}
                  alt={`Random ${absoluteIndex + 1}`}
                  // Removed inline width/height; .image-wrapper img CSS handles it
                  className="nice-border"
                />
                {overlayToggles[absoluteIndex] && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 2, // Position correctly relative to the wrapper
                      left: 2, // Position correctly relative to the wrapper
                      width: '102%',
                      height: '102%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '7px', // This should match border-radius of the image/wrapper roughly
                    }}
                  >
                    <img
                      src={require('./images/x-out.png')}
                      alt="Overlay"
                      style={{
                        width: '100%',
                        height: '100%',
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