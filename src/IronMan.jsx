import { useEffect, useState } from 'react';
import './App.css';
import shuffleAnimation from './components/shuffleAnimation';


const images = importAll(require.context('./assets/color_images', false, /\.(png)$/));

function importAll(r) {
  return r.keys().map(r);
}




function IronMan() {

  const [size, setSize] = useState(() => {
    return Number(localStorage.getItem('ironman-size')) || 3;
  });

  const [randomImages, setRandomImages] = useState(() => {
    const saved = localStorage.getItem('ironman-images');
    return saved ? JSON.parse(saved) : Array(size).fill(null);
  });

  // Save size whenever it changes
  useEffect(() => {
    localStorage.setItem('ironman-size', size);
  }, [size]);

  // Save images whenever they change
  useEffect(() => {
    localStorage.setItem('ironman-images', JSON.stringify(randomImages));
  }, [randomImages]);



  
  // getRandomImages clearly had a pattern so chatGPT gave me this idk how it works tho
  function fisherYatesShuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function getRandomImages(x) {
    const shuffled = fisherYatesShuffle(images);
    return shuffled.slice(0, x);
  }



  async function handleClick() {
    const selectedImages = getRandomImages(size);

    // Start all animations in parallel
    await Promise.all(
      selectedImages.map((finalImg, i) =>
        shuffleAnimation(
          (img) => {
            setRandomImages(prev => {
              const updated = [...prev];
              updated[i] = img;
              return updated;
            });
          },
          finalImg
        )
      )
    );
  }

  function handleSizeChange(e) {
    const newSize = Math.max(1, Number(e.target.value));
    setSize(newSize);
    setRandomImages(Array(newSize).fill(null));
  }


  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="ironSize">Number of Characters: </label>
        <input
          id="ironSize"
          type="number"
          min="1"
          max="86"
          value={size}
          onChange={handleSizeChange}
        />
      </div>

      <button onClick={handleClick} className="shuffle-button">
        Shuffle
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
        {randomImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Random ${index + 1}`}
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            className="nice-border"
          />
        ))}
      </div>
    </div>
  );
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default IronMan;







// function MyImage() {
//   const images = importAll(require.context('./assets/color_images', false, /\.(png)$/));
//   const imageValues = Object.values(images);
//   const randomIndex = Math.floor(Math.random() * imageValues.length);
//   const randomImage = imageValues[randomIndex];

//   return <img src={randomImage} alt="Random" />;
// }
