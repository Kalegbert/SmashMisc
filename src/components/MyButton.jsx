import { useState } from 'react';
import './App.css';


export default function MyButton() {

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