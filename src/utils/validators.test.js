// src/utils/validators.test.js

import {
    validateName,
    validateEmail,
    validateCity,
    validatePostalCode,
    validateDOB,
} from './validators';

describe('Fonctions de Validation', () => {
    describe('validateName', () => {
        it('doit valider les noms corrects', () => {
            expect(validateName('Jean')).toBe(true);
            expect(validateName('Émilie')).toBe(true);
            expect(validateName('Anne-Marie')).toBe(true);
        });

        it('ne doit pas valider les noms incorrects', () => {
            expect(validateName('Jean123')).toBe(false);
            expect(validateName('Jean@')).toBe(false);
            expect(validateName('')).toBe(false);
        });
    });

    describe('validateEmail', () => {
        it('doit valider les emails corrects', () => {
            expect(validateEmail('test@example.com')).toBe(true);
            expect(validateEmail('user.name@domain.co')).toBe(true);
        });

        it('ne doit pas valider les emails incorrects', () => {
            expect(validateEmail('test@.com')).toBe(false);
            expect(validateEmail('test@com')).toBe(false);
            expect(validateEmail('test.com')).toBe(false);
            expect(validateEmail('')).toBe(false);
        });
    });

    describe('validateCity', () => {
        it('doit valider les villes correctes', () => {
            expect(validateCity('Paris')).toBe(true);
            expect(validateCity('New York')).toBe(true);
            expect(validateCity('São Paulo')).toBe(true);
        });

        it('ne doit pas valider les villes incorrectes', () => {
            expect(validateCity('Paris123')).toBe(false);
            expect(validateCity('New@York')).toBe(false);
            expect(validateCity('')).toBe(false);
        });
    });

    describe('validatePostalCode', () => {
        it('doit valider les codes postaux corrects', () => {
            expect(validatePostalCode('75001')).toBe(true);
            expect(validatePostalCode('13000')).toBe(true);
        });

        it('ne doit pas valider les codes postaux incorrects', () => {
            expect(validatePostalCode('7500')).toBe(false);
            expect(validatePostalCode('75A01')).toBe(false);
            expect(validatePostalCode('')).toBe(false);
        });
    });

    describe('validateDOB', () => {
        it('doit valider les dates de naissance avec plus de 18 ans', () => {
            const eighteenYearsAgo = new Date();
            eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
            const dateString = eighteenYearsAgo.toISOString().split('T')[0];
            expect(validateDOB(dateString)).toBe(true);
        });

        it('ne doit pas valider les dates de naissance avec moins de 18 ans', () => {
            const seventeenYearsAgo = new Date();
            seventeenYearsAgo.setFullYear(seventeenYearsAgo.getFullYear() - 17);
            const dateString = seventeenYearsAgo.toISOString().split('T')[0];
            expect(validateDOB(dateString)).toBe(false);
        });
    });
});
