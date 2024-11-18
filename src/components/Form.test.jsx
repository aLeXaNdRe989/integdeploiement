// src/components/Form.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from './Form';

describe('Form Component', () => {
    const mockAddUser = jest.fn();

    beforeEach(() => {
        render(<Form addUser={mockAddUser} />);
        localStorage.clear();
        mockAddUser.mockClear();
    });

    it('désactive le bouton Sauvegarder si les champs ne sont pas remplis', () => {
        const saveButton = screen.getByText(/Sauvegarder/i);
        expect(saveButton).toBeDisabled();
    });

    it('active le bouton Sauvegarder lorsque tous les champs sont remplis', () => {
        fireEvent.change(screen.getByPlaceholderText(/Prénom/i), { target: { value: 'Jean' } });
        fireEvent.change(screen.getByPlaceholderText(/Nom/i), { target: { value: 'Dupont' } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'jean.dupont@example.com' } });
        fireEvent.change(screen.getByLabelText(/date de naissance/i), { target: { value: '1990-01-01' } });
        fireEvent.change(screen.getByPlaceholderText(/Ville/i), { target: { value: 'Paris' } });
        fireEvent.change(screen.getByPlaceholderText(/Code postal/i), { target: { value: '75001' } });

        const saveButton = screen.getByText(/Sauvegarder/i);
        expect(saveButton).not.toBeDisabled();
    });

    it('affiche les erreurs et le toaster d\'erreur lorsqu\'un champ est invalide', async () => {
        fireEvent.change(screen.getByPlaceholderText(/Prénom/i), { target: { value: 'Jean123' } });
        fireEvent.change(screen.getByPlaceholderText(/Nom/i), { target: { value: 'Dupont@' } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'invalid-email' } });
        fireEvent.change(screen.getByLabelText(/date de naissance/i), { target: { value: '2010-01-01' } });
        fireEvent.change(screen.getByPlaceholderText(/Ville/i), { target: { value: 'Paris1' } });
        fireEvent.change(screen.getByPlaceholderText(/Code postal/i), { target: { value: '7500' } });

        const saveButton = screen.getByText(/Sauvegarder/i);
        fireEvent.click(saveButton);

        expect(await screen.findByText(/Prénom invalide/i)).toBeInTheDocument();
        expect(await screen.findByText(/Nom invalide/i)).toBeInTheDocument();
        expect(await screen.findByText(/Email invalide/i)).toBeInTheDocument();
        expect(await screen.findByText(/Vous devez avoir au moins 18 ans/i)).toBeInTheDocument();
        expect(await screen.findByText(/Ville invalide/i)).toBeInTheDocument();
        expect(await screen.findByText(/Code postal invalide/i)).toBeInTheDocument();

        expect(await screen.findByText(/Veuillez corriger les erreurs du formulaire./i)).toBeInTheDocument();
    });

    it('sauvegarde l\'utilisateur, affiche le toaster de succès et vide les champs', async () => {
        fireEvent.change(screen.getByPlaceholderText(/Prénom/i), { target: { value: 'Jean' } });
        fireEvent.change(screen.getByPlaceholderText(/Nom/i), { target: { value: 'Dupont' } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'jean.dupont@example.com' } });
        fireEvent.change(screen.getByLabelText(/date de naissance/i), { target: { value: '1990-01-01' } });
        fireEvent.change(screen.getByPlaceholderText(/Ville/i), { target: { value: 'Paris' } });
        fireEvent.change(screen.getByPlaceholderText(/Code postal/i), { target: { value: '75001' } });

        const saveButton = screen.getByText(/Sauvegarder/i);
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(screen.getByText(/Inscription réussie !/i)).toBeInTheDocument();
        });

        // Vérifier que les champs sont vidés
        expect(screen.getByPlaceholderText(/Prénom/i).value).toBe('');
        expect(screen.getByPlaceholderText(/Nom/i).value).toBe('');
        expect(screen.getByPlaceholderText(/Email/i).value).toBe('');
        expect(screen.getByLabelText(/date de naissance/i).value).toBe('');
        expect(screen.getByPlaceholderText(/Ville/i).value).toBe('');
        expect(screen.getByPlaceholderText(/Code postal/i).value).toBe('');

        // Vérifier que l'utilisateur est sauvegardé dans le localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        expect(storedUsers).toHaveLength(1);
        expect(storedUsers[0]).toEqual({
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jean.dupont@example.com',
            dob: '1990-01-01',
            city: 'Paris',
            postalCode: '75001',
        });

        // Vérifier que la fonction addUser est appelée
        expect(mockAddUser).toHaveBeenCalledWith({
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jean.dupont@example.com',
            dob: '1990-01-01',
            city: 'Paris',
            postalCode: '75001',
        });
    });
});
