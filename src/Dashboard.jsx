import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import aboutMeImage from './components/images/aboutMe.jpg';
import luigiGamble from './components/images/luigiGamble.jpg';
import ironManImage from './components/images/qblock.jpg';
import LinkBox from './components/LinkBox';
import Modal from './components/Modal';
import './components/Modal.css';

export default function Dashboard({ user }) {
    const [username, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser && !user) {
            setUser(JSON.parse(savedUser));
        }
    }, [user]);


    const navigate = useNavigate();
    const [showAboutModal, setShowAboutModal] = useState(false);

    return (
        <div className="App">



            <header className="App-header">
                <h2>Welcome, {user.username}!</h2>
                <hr className="seperate"></hr>
                <div className="link-box-row">
                    <LinkBox
                        words="Iron Man"
                        imgPath={ironManImage}
                        nav="/"
                    />
                    <LinkBox
                        words="About Me"
                        imgPath={aboutMeImage}
                        onClick={() => setShowAboutModal(true)}
                    />
                    <LinkBox
                        words="Gambling"
                        imgPath={luigiGamble}
                        nav="/about"
                    />
                </div>

                {showAboutModal && (
                    <Modal onClose={() => setShowAboutModal(false)}>
                        <div className="modal-text">
                            Kyle Egbert
                        </div>
                        <p>
                            <a
                                className="App-link"
                                href="https://github.com/Kalegbert"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                My Github
                            </a>
                        </p>
                    </Modal>
                )}

            </header>

            <div className="top-right">
                <button onClick={() => navigate("/login")} className="my-button">
                    Login
                </button>
                <button onClick={() => {
                    localStorage.removeItem('user');
                    setUser(null);
                    navigate('/login');
                }}
                    className="my-button">
                    Logout
                </button>
                <button onClick={() => navigate("/dashboard")} className="my-button">
                    Dashboard
                </button>

            </div>

            {user.role === 'admin' && (
                <button onClick={() => navigate('/admin')}>Go to Admin Page</button>
            )}
        </div>
    );
}
