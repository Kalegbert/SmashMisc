import './App.css';
import ImageGrid from './components/ImageGrid';
import shuffleAnimation from './components/shuffleAnimation';
import ShuffleButton from './components/ShuffleButton';
import { useImageStorage } from './components/useImageStorage';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./assets/color_images', false, /\.(png)$/));

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

function IronMan({ size, storageKey }) {
  const { randomImages, setRandomImages } = useImageStorage(storageKey, size, (n) => Array(n).fill(null));

  async function handleClick() {
    const selectedImages = getRandomImages(size);
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

  return (
    <div>
      <ShuffleButton onClick={handleClick} />
      <ImageGrid images={randomImages} />
    </div>
  );
}

export default IronMan;
