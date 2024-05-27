import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const UserForm = ({ user }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            console.error('User is not authenticated');
            return;
        }
        try {
            await addDoc(collection(db, 'users'), {
                name,
                email,
                createdBy: user.uid
            });
            setName('');
            setEmail('');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <div className="user-form-container">
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Add User</button>
            </form>
        </div>
    );
};

export default UserForm;
