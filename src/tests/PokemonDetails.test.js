import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { render } from '@testing-library/react';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  it(`Teste se as informações detalhadas do Pokémon
  selecionado são mostradas na tela.`, () => {
    const { getByRole, getAllByRole, queryByText, getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const headingH2 = getByRole('heading', {
      name: 'Pikachu Details',
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();
    const linkMoreDetails = queryByText('More details');
    expect(linkMoreDetails).not.toBeInTheDocument();

    // A seção de detalhes deve conter um heading h2 com o texto Summary
    const summaryH2 = getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(summaryH2).toBeInTheDocument();

    const summaryText = getByText(/This intelligent Pokémon roasts hard/);
    expect(summaryText).toBeInTheDocument();
  });
  it(`Teste se existe na página uma seção com os
  mapas contendo as localizações do pokémon`, () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const headingH2 = getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();
    // Verificando se todas as localizações do pokemon estão presentes na seção de detalhes
    const firstLocation = getByText('Kanto Viridian Forest');
    expect(firstLocation).toBeInTheDocument();
    const secondLocation = getByText('Kanto Power Plant');
    expect(secondLocation).toBeInTheDocument();

    const imgsLocation = getAllByRole('img');
    console.log();
  });
});
