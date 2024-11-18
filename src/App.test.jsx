// src/App.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('permet d\'ajouter un utilisateur et de l\'afficher dans la liste', async () => {
    render(<App />);

    // Remplir le formulaire
    fireEvent.change(screen.getByPlaceholderText(/Prénom/i), { target: { value: 'Marie' } });
    fireEvent.change(screen.getByPlaceholderText(/Nom/i), { target: { value: 'Curie' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'marie.curie@example.com' } });
    fireEvent.change(screen.getByLabelText(/date de naissance/i), { target: { value: '1980-11-07' } });
    fireEvent.change(screen.getByPlaceholderText(/Ville/i), { target: { value: 'Lyon' } });
    fireEvent.change(screen.getByPlaceholderText(/Code postal/i), { target: { value: '69000' } });

    // Cliquer sur Sauvegarder
    const saveButton = screen.getByText(/Sauvegarder/i);
    fireEvent.click(saveButton);

    // Attendre le toaster de succès
    await waitFor(() => {
      expect(screen.getByText(/Inscription réussie !/i)).toBeInTheDocument();
    });

    // Vérifier que l'utilisateur est affiché dans la liste
    expect(screen.getByText(/Marie Curie - Lyon \(69000\)/i)).toBeInTheDocument();

    // Vérifier que le formulaire est vidé
    expect(screen.getByPlaceholderText(/Prénom/i).value).toBe('');
    expect(screen.getByPlaceholderText(/Nom/i).value).toBe('');
    expect(screen.getByPlaceholderText(/Email/i).value).toBe('');
    expect(screen.getByLabelText(/date de naissance/i).value).toBe('');
    expect(screen.getByPlaceholderText(/Ville/i).value).toBe('');
    expect(screen.getByPlaceholderText(/Code postal/i).value).toBe('');
  });
});
