import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('6. Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const namePokemon = getByTestId('pokemon-name');
    expect(namePokemon.textContent).toBe('Pikachu');

    const typePokemon = getByTestId('pokemon-type');
    expect(typePokemon.textContent).toBe('Electric');

    const weightPokemon = getByTestId('pokemon-weight');
    expect(weightPokemon.textContent).toBe('Average weight: 6.0 kg');

    const imagePokemon = getByRole('img');
    expect(imagePokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imagePokemon.alt).toBe('Pikachu sprite');
  });
  it(`Teste se o card do Pokémon indicado na Pokédex
   contém um link de navegação para exibir detalhes 
   deste Pokémon. O link deve possuir a URL /
   pokemons/<id>, onde <id> é o id do Pokémon 
   exibido;`, () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkMoreDetails = getByRole('link', {
      name: 'More details',
    });
    expect(linkMoreDetails).toBeInTheDocument();
    expect(linkMoreDetails.href).toBe('http://localhost/pokemons/25');
  });
  it(`Teste se ao clicar no link de navegação do 
  Pokémon, é feito o redirecionamento da aplicação
  para a página de detalhes de Pokémon.`, () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkMoreDetails = getByRole('link', {
      name: 'More details',
    });
    // console.log(linkMoreDetails);
    userEvent.click(linkMoreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const linkMoreDetails = getByRole('link', {
      name: 'More details',
    });
    userEvent.click(linkMoreDetails);

    userEvent.click(getByText('Pokémon favoritado?'));
    const starFavorite = getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });
    // console.log(startFavorite);
    expect(starFavorite.src).toBe('http://localhost/star-icon.svg');
    expect(starFavorite.alt).toBe('Pikachu is marked as favorite');
  });
});
