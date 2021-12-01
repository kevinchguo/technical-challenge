import type { FC } from 'react';

interface HomeProps {
    user: string | null;
    isLoggedIn: boolean;
}

const Home: FC<HomeProps> = ({ user, isLoggedIn }) => {
    return (
        <>
            <h2>Home page</h2>
            {user && isLoggedIn ? (
                <div>Welcome {user}</div>
            ) : (
                <div>You are currently not logged in.</div>
            )}
        </>
    );
};

export default Home;
