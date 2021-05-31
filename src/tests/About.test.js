import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

test('Verificando se a página About contem as informações da Pakédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const headingPageAbout = getByRole('heading', {
        name:'About Pokédex',
        level: 2,
    })
    expect(headingPageAbout).toBeInTheDocument();
});

test('Vrificando de a gágina About da Pokédex contem dois paragrafos', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
    const secondParagrapy = getByText('One can filter Pokémons by type, and see more details for each one of them');
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagrapy).toBeInTheDocument();
});

test('Verificando se a página contem o link da imagem de background da página About', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imageBackgroudAbout = getByRole('img');
    expect(imageBackgroudAbout.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
