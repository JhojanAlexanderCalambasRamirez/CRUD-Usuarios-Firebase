// src/components/UserUpdateForm.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const UserUpdateForm = ({ selectedUser, setSelectedUser }) => {
    const [name, setName] = useState(selectedUser.name);
    const [email, setEmail] = useState(selectedUser.email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userRef = doc(db, 'users', selectedUser.id);
        await updateDoc(userRef, {
            name,
            email
        });
        setSelectedUser(null); // Clear the selected user after updating
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Update User</button>
        </form>
    );
};

export default UserUpdateForm;
