import '../App.css';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const images = importAll(require.context('../assets/color_images', false, /\.(png)$/));

function importAll(r) {
  return r.keys().map(r);
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


export default shuffleAnimation;