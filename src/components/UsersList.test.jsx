// src/components/UsersList.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import UsersList from './UsersList';

describe('UsersList Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('affiche le message quand il n\'y a pas d\'utilisateurs', () => {
        render(<UsersList />);
        const message = screen.getByText(/Aucun inscrit pour le moment./i);
        expect(message).toBeInTheDocument();
    });

    it('affiche la liste des utilisateurs', () => {
        const users = [
            { firstName: 'Jean', lastName: 'Dupont', city: 'Paris', postalCode: '75001' },
            { firstName: 'Marie', lastName: 'Curie', city: 'Lyon', postalCode: '69000' },
        ];
        localStorage.setItem('users', JSON.stringify(users));

        render(<UsersList />);

        expect(screen.getByText(/Jean Dupont - Paris \(75001\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Marie Curie - Lyon \(69000\)/i)).toBeInTheDocument();
    });
});
