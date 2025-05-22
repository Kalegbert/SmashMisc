import { useNavigate } from "react-router-dom";
import '../App.css';

// LinkBox.jsx
export default function LinkBox({ words, imgPath, nav, onClick }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (nav) {
            navigate(nav);
        }
    };

    return (
        <div>
            <button onClick={handleClick} className="image-button">
                <img
                    src={imgPath}
                    alt={words}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
                    className="nice-border"
                />
                <div className="button-caption">{words}</div>
            </button>
        </div>
    );
}