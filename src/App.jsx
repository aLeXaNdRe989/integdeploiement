// src/App.jsx

import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import UsersList from './components/UsersList';
import './App.css'; // Créez ce fichier pour le style global

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
      <div className="App">
        <h1>Formulaire d'Inscription</h1>
        <Form addUser={addUser} />
        <UsersList />
      </div>
  );
};

export default App;
