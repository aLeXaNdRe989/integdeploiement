// src/components/Toaster.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import Toaster from './Toaster';

describe('Toaster Component', () => {
    it('affiche un message de succès correctement', () => {
        render(<Toaster type="success" message="Opération réussie!" />);
        const toasterElement = screen.getByText(/Opération réussie!/i);
        expect(toasterElement).toBeInTheDocument();
        expect(toasterElement).toHaveClass('toaster success');
    });

    it('affiche un message d\'erreur correctement', () => {
        render(<Toaster type="error" message="Une erreur est survenue." />);
        const toasterElement = screen.getByText(/Une erreur est survenue./i);
        expect(toasterElement).toBeInTheDocument();
        expect(toasterElement).toHaveClass('toaster error');
    });
});
