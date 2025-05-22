import { useEffect, useState } from 'react';
import './App.css';


const users = [
  { username: "admin", password: "1234", role: "admin" },
  { username: "guest", password: "abcd", role: "user" }
];

const images = importAll(require.context('./assets/color_images', false, /\.(png)$/));

function importAll(r) {
  return r.keys().map(r);
}




const user = {
  name: 'Kyle Egbert',
  // imageUrl: 'https://static.wikia.nocookie.net/ssb/images/a/a9/Chrom_-_Super_Smash_Bros._Ultimate.png',
  imageSize: 90,
};



function MyButton() {

  const [currentImage, setCurrentImage] = useState(images[0]);

  async function handleClick(setterFunction) {
    let x = 80
    for (let i = 0; i < 13; i++) {
      const randomIndex = Math.floor(Math.random() * images.length);
      setterFunction(images[randomIndex]);
      if (i > 5) {
        x += 20
      }
      await sleep(x);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button onClick={() => handleClick(setCurrentImage)} className="image-button">
        <img
          src={currentImage}
          alt="Random character"
          style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
          className="nice-border"
        />
      </button>
    </div>
  );
}

async function shuffleAnimation(setImageAtIndex, finalImage) {


  function getRandomInt(min, max) {
    min = Math.ceil(min); // Rounds up to the nearest integer
    max = Math.floor(max); // Rounds down to the nearest integer
    return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
  }

  let delay = getRandomInt(70, 80);
  for (let i = 0; i < getRandomInt(11, 15); i++) {
    const randomIndex = Math.floor(Math.random() * images.length);
    setImageAtIndex(images[randomIndex]);
    if (i > 5) {
      delay += 20;
    }
    await sleep(delay);
  }
  // Set the final selected image
  setImageAtIndex(finalImage);
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


function Testing() {

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
