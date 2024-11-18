// src/components/Form.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    validateName,
    validateEmail,
    validateCity,
    validatePostalCode,
    validateDOB,
} from '../utils/validators';
import Toaster from './Toaster';
import './Form.css'; // Assurez-vous de créer ce fichier pour le style

const Form = ({ addUser }) => {
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        city: '',
        postalCode: '',
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [toaster, setToaster] = useState({ type: '', message: '', visible: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Supprimer l'erreur en temps réel
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!validateName(formData.firstName)) {
            newErrors.firstName = 'Prénom invalide';
        }

        if (!validateName(formData.lastName)) {
            newErrors.lastName = 'Nom invalide';
        }

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Email invalide';
        }

        if (!validateDOB(formData.dob)) {
            newErrors.dob = 'Vous devez avoir au moins 18 ans';
        }

        if (!validateCity(formData.city)) {
            newErrors.city = 'Ville invalide';
        }

        if (!validatePostalCode(formData.postalCode)) {
            newErrors.postalCode = 'Code postal invalide';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            // Sauvegarder dans le local storage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(formData);
            localStorage.setItem('users', JSON.stringify(users));

            // Afficher le toaster de succès
            setToaster({ type: 'success', message: 'Inscription réussie !', visible: true });

            // Vider le formulaire
            setFormData(initialState);

            // Appeler la fonction pour mettre à jour la liste des utilisateurs
            addUser(formData);

            // Masquer le toaster après 3 secondes
            setTimeout(() => setToaster({ ...toaster, visible: false }), 3000);
        } else {
            // Afficher les erreurs
            setErrors(validationErrors);

            // Afficher le toaster d'erreur
            setToaster({ type: 'error', message: 'Veuillez corriger les erreurs du formulaire.', visible: true });

            // Masquer le toaster après 3 secondes
            setTimeout(() => setToaster({ ...toaster, visible: false }), 3000);
        }
    };

    // Vérifier si tous les champs sont remplis
    const isFormFilled = Object.values(formData).every((field) => field !== '');

    return (
        <div className="form-container">
            {toaster.visible && <Toaster type={toaster.type} message={toaster.message} />}
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Prénom"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Nom"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Date de naissance</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                    {errors.dob && <span className="error">{errors.dob}</span>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="city"
                        placeholder="Ville"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    {errors.city && <span className="error">{errors.city}</span>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Code postal"
                        value={formData.postalCode}
                        onChange={handleChange}
                    />
                    {errors.postalCode && <span className="error">{errors.postalCode}</span>}
                </div>

                <button type="submit" disabled={!isFormFilled}>
                    Sauvegarder
                </button>
            </form>
        </div>
    );
};

Form.propTypes = {
    addUser: PropTypes.func.isRequired,
};

export default Form;
