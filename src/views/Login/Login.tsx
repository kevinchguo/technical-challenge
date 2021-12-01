import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { AXIOS_CONFIG, FORM_NAMES } from '../../constants/constants';

interface LoginCredentials {
    username: string;
    password: string;
}

interface LoginProps {
    logInUserSuccess: (username: string) => void;
    isLoggedIn: boolean;
}

const formStyles = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    width: '300px',
    padding: '15px',
    gap: '15px',
    borderRadius: '5px',
    boxShadow: '5px rgba(0,0,0,0.2)',
};

const formInputStyles = {
    borderRadius: '5px',
    padding: '5px',
};

const formErrorMsg = {
    color: 'red',
};

const Login: FC<LoginProps> = ({ logInUserSuccess, isLoggedIn }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
        username: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const { username, password } = loginCredentials;
    const navigate = useNavigate();

    useEffect(() => {
        // Handles redirect when user is logged in
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleLoginCredentials = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        if (!username || !password) {
            setError(null);
        }
        setLoginCredentials({
            ...loginCredentials,
            [e.target.name]: e.target.value,
        });
    };

    const login = (e: React.FormEvent<HTMLElement>): void => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        if (!username && !password) {
            setError('Please fill in all fields.');
            setLoading(false);
        } else if (!password) {
            setError('Password missing.');
            setLoading(false);
        } else if (!username) {
            setError('Username missing.');
            setLoading(false);
        } else {
            try {
                axios
                    .post(
                        `${process.env.REACT_APP_AUTH_ENPOINT}`,
                        loginCredentials,
                        AXIOS_CONFIG
                    )
                    .then((res) => {
                        // console.log(res);
                        setLoading(false);
                        logInUserSuccess(res.data.username);
                        // Store authToken in localStorage/sessionStorage/cookies??
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false);
                        if (err.response) {
                            setError(`Error ${err.response.status}`);
                        } else {
                            setError(err.message);
                        }
                    });
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError('Something went wrong. Please try again later.');
            }
        }
    };

    return (
        <>
            <h2>Login page</h2>
            <form
                style={formStyles}
                action="submit"
                onSubmit={(e: React.FormEvent<HTMLElement>) => login(e)}
            >
                <input
                    style={formInputStyles}
                    type="text"
                    name={FORM_NAMES.username}
                    value={username}
                    placeholder="Username"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleLoginCredentials(e)
                    }
                />
                <input
                    style={formInputStyles}
                    type="password"
                    name={FORM_NAMES.password}
                    value={password}
                    placeholder="Password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleLoginCredentials(e)
                    }
                />
                {error && <div style={formErrorMsg}>{error}</div>}
                {loading ? (
                    <button disabled={true}>Logging in...</button>
                ) : (
                    <button type="submit">Login</button>
                )}
            </form>
        </>
    );
};

export default Login;
