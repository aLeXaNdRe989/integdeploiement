// src/components/UsersList.jsx

import React, { useEffect, useState } from 'react';
import './UsersList.css'; // Créez ce fichier pour le style

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    return (
        <div className="users-list">
            <h2>Liste des inscrits</h2>
            {users.length === 0 ? (
                <p>Aucun inscrit pour le moment.</p>
            ) : (
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>
                            {user.firstName} {user.lastName} - {user.city} ({user.postalCode})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsersList;
