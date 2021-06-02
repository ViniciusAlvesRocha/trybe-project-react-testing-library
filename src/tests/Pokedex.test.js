import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing <Pokedex.js> component', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const headingH2 = getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();
  });
  it(`Testa se é exibido o próximo Pokémon da lista quando
   o botão Próximo pokémon é clicado.`, () => {
    const pokemons = [
      {
        name: 'Charmander',
      },
      {
        name: 'Caterpie',
      },
      {
        name: 'Ekans',
      },
      {
        name: 'Alakazam',
      },
      {
        name: 'Mew',
      },
      {
        name: 'Rapidash',
      },
      {
        name: 'Snorlax',
      },
      {
        name: 'Dragonair',
      },
      {
        name: 'Pikachu',
      },
    ];
    const { getByRole, getByText } = renderWithRouter(<App />);
    for (let index = 0; index < pokemons.length; index += 1) {
      const btnNextPokemon = getByRole('button', {
        name: 'Próximo pokémon',
      });
      userEvent.click(btnNextPokemon);
      expect(getByText(pokemons[index].name)).toBeInTheDocument();
    }
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const buttons = [
      'All',
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    for (let index = 0; index < buttons.length; index += 1) {
      const button = getByRole('button', {
        name: buttons[index],
      });
      expect(button).toBeInTheDocument();
    }
  });
  it(`A partir da seleção de um botão de tipo, a Pokédex deve circular
   somente pelos pokémons daquele tipo`, () => {
    const pokemonsByFilter = [
      {
        type: 'Eletric',
        pokemons: [
          'Pikachu',
        ],
      },
      {
        type: 'Fire',
        pokemons: [
          'Charmander',
          'Rapidash',
        ],
      },
      {
        type: 'Bug',
        pokemons: [
          'Caterpie',
        ],
      },
      {
        type: 'Poison',
        pokemons: [
          'Ekans',
        ],
      },
      {
        type: 'Psychic',
        pokemons: [
          'Alakazam',
          'Mew',
        ],
      },
    ];
    const { getByRole, getByText } = renderWithRouter(<App />);
    for (let index = 0; index < pokemonsByFilter; index += 1) {
      const btnFilter = getByRole('button', {
        name: pokemonsByFilter[index].type,
      });
      userEvent.click(btnFilter);
      for (let pokemonsIndex = 0;
        pokemonsIndex < pokemonsByFilter[index].pokemons.length;
        pokemonsIndex += 1) {
        expect(
          getByText(pokemonsByFilter[index].pokemons[pokemonsIndex]),
        ).toBeInTheDocument();
      }
    }
  });
});
