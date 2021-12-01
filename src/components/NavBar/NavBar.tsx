import type { FC } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavBarProps {
    isLoggedIn: boolean;
    logout: () => void;
}

const NavBar: FC<NavBarProps> = ({ isLoggedIn, logout }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    return (
        <section className="navBar">
            <Link to="/">
                <button>Home</button>
            </Link>
            {isLoggedIn ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <Link to="/login">
                    <button>Login</button>
                </Link>
            )}
        </section>
    );
};

export default NavBar;
