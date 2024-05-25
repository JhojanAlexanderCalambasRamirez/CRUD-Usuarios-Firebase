// src/App.js
import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Auth from './components/Auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, [auth]);

    return (
        <div>
            <h1>Firebase CRUD</h1>
            {currentUser ? (
                <>
                    <UserForm user={currentUser} />
                    <UserList />
                    <button onClick={() => auth.signOut()}>Sign Out</button>
                </>
            ) : (
                <Auth setUser={setCurrentUser} />
            )}
        </div>
    );
};

export default App;
