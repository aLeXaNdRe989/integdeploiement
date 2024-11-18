// src/utils/validators.js

export const validateName = (name) => {
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/;
    return nameRegex.test(name);
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateCity = (city) => {
    const cityRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ- ]+$/;
    return cityRegex.test(city);
};

export const validatePostalCode = (postalCode) => {
    const postalCodeRegex = /^\d{5}$/;
    return postalCodeRegex.test(postalCode);
};

export const validateDOB = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18;
};
