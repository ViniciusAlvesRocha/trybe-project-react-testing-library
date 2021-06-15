import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  const POKEMONS_25 = '/pokemons/25';
  it(`Teste se as informações detalhadas do Pokémon
  selecionado são mostradas na tela.`, () => {
    const { getByRole, queryByText, getByText, history } = renderWithRouter(<App />);
    history.push(POKEMONS_25);
    const headingH2 = getByRole('heading', {
      name: 'Pikachu Details',
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();

    /* Não deve existir o link de navegação para os detalhes do Pokémon selecionado. */
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
    const {
      getByRole,
      getAllByRole,
      getByText,
      history,
      getAllByAltText } = renderWithRouter(<App />);
    history.push(POKEMONS_25);
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

    /* Devem ser exibidos, o nome da localização e
    uma imagem do mapa em cada localização; */

    const imagesLocations = getAllByRole('img');

    expect(imagesLocations[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    expect(imagesLocations[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    /* A imagem da localização deve ter um atributo alt
    com o texto <name> location, onde <name> é o nome do Pokémon; */
    const altTextPikachuLocation = getAllByAltText(/Pikachu location/);
    expect(altTextPikachuLocation.length).toBe(2);
  });
  it(`Teste se o usuário pode favoritar 
  um pokémon através da página de detalhes.`, () => {
    const { getByLabelText, getByAltText, history } = renderWithRouter(<App />);
    history.push(POKEMONS_25);
    /* A página deve exibir um checkbox que
    permite favoritar o Pokémon; */
    const inputCheckbox = getByLabelText(/Pokémon favoritado/);
    expect(inputCheckbox).toBeInTheDocument();
    /* Cliques alternados no checkbox devem adicionar
    e remover respectivamente o Pokémon da lista de
    favoritos; */
    userEvent.click(inputCheckbox);
    history.push(/favorites/);

    /* Verificando se o pikachu é adicionado
    a lista de favoritos: */
    const pikachuInFavoritePokemons = getByAltText(/Pikachu sprite/);
    expect(pikachuInFavoritePokemons).toBeInTheDocument();

    /* history.push('/pokemons/25');
    userEvent.click(inputCheckbox);
    history.push(/favorites/);
    expect(pikachuInFavoritePokemons).not.toBeInTheDocument(); */
  });
});
