// src/components/Toaster.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './Toaster.css'; // Créez ce fichier pour le style

const Toaster = ({ type, message }) => {
    return (
        <div className={`toaster ${type}`}>
            {message}
        </div>
    );
};

Toaster.propTypes = {
    type: PropTypes.oneOf(['success', 'error']).isRequired,
    message: PropTypes.string.isRequired,
};

export default Toaster;
