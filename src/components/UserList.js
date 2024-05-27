import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentUserId, setCurrentUserId] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');

    useEffect(() => {
        const q = query(collection(db, 'users'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const usersData = [];
            querySnapshot.forEach((doc) => {
                usersData.push({ ...doc.data(), id: doc.id });
            });
            setUsers(usersData);
        });
        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'users', id));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    const handleEdit = (user) => {
        setEditMode(true);
        setCurrentUserId(user.id);
        setCurrentName(user.name);
        setCurrentEmail(user.email);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const userRef = doc(db, 'users', currentUserId);
        await updateDoc(userRef, {
            name: currentName,
            email: currentEmail
        });
        setEditMode(false);
        setCurrentUserId('');
        setCurrentName('');
        setCurrentEmail('');
    };

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user.id} className="user-list-item">
                        <span>{user.name} ({user.email})</span>
                        <div>
                            <button className="edit-button" onClick={() => handleEdit(user)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {editMode && (
                <form onSubmit={handleUpdate} className="update-form">
                    <input
                        type="text"
                        value={currentName}
                        onChange={(e) => setCurrentName(e.target.value)}
                    />
                    <input
                        type="email"
                        value={currentEmail}
                        onChange={(e) => setCurrentEmail(e.target.value)}
                    />
                    <button type="submit" className="update-button">Update User</button>
                </form>
            )}
        </div>
    );
};

export default UserList;
