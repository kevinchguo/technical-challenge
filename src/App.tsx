import { FC, useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './views/Home';
import Login from './views/Login';

import './App.css';

const App: FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<string | null>(null);

    const logInUserSuccess = (username: string): void => {
        setIsLoggedIn(true);
        setUser(username);
        // Store authToken in memory??
    };

    // Logout to clear user state
    const logout = (): void => {
        if (user && isLoggedIn) {
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    useEffect(() => {
        if (!process.env.REACT_APP_AUTH_ENDPOINT) {
            alert('Please refer to README.md for neccessary .env variable');
        }
    }, []);

    return (
        <div className="App">
            <h1>Technical Challenge</h1>
            <Router>
                <NavBar isLoggedIn={isLoggedIn} logout={logout} />
                <Routes>
                    <Route
                        path="/"
                        element={<Home user={user} isLoggedIn={isLoggedIn} />}
                    />
                    <Route
                        path="/login"
                        element={
                            <Login
                                logInUserSuccess={logInUserSuccess}
                                isLoggedIn={isLoggedIn}
                            />
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
