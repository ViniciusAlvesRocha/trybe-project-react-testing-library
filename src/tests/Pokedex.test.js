import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

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

const pokemonsByFilter = [
  {
    type: 'All',
    pokemons: [
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
    ],
  },
  {
    type: 'Electric',
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
    for (let index = 0; index < buttons.length; index += 1) {
      const button = getByRole('button', {
        name: buttons[index],
      });
      expect(button).toBeInTheDocument();
    }
  });
  it(`A partir da seleção de um botão de tipo, a Pokédex deve circular
   somente pelos pokémons daquele tipo`, () => {
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
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const btnResetFilter = getByRole('button', {
      name: 'All',
    });
    userEvent.click(btnResetFilter);
  });
  it(`Teste se é criado, dinamicamente, 
  um botão de filtro para cada tipo de Pokémon`, () => {
    const pokemonTypes = [
      'Fire',
      'Psychic',
      'Electric',
      'Bug',
      'Poison',
      'Dragon',
      'Normal',
    ];

    const { getByRole } = renderWithRouter(<App />);

    pokemonTypes.forEach((pokemonType) => {
      expect(getByRole('button', {
        name: pokemonType,
      })).toBeInTheDocument();
      expect(getByRole('button', {
        name: 'All',
      })).toBeInTheDocument();
    });

    pokemonsByFilter.forEach((item) => {
      const btnTypePokemon = getByRole('button', {
        name: item.type,
      });
      userEvent.click(btnTypePokemon);
      const btnProximoPokemon = getByRole('button', {
        name: /Próximo pokémon/,
      });
      if (item.pokemons.length === 1) {
        expect(btnProximoPokemon.disabled).toBeTruthy();
      } else {
        expect(btnProximoPokemon.disabled).not.toBeTruthy();
      }
    });
  });
  it('Pokemon tipo botão', () => {
    const numberOfButtons = 7;
    const { getAllByTestId } = renderWithRouter(<App />);
    const btn = getAllByTestId('pokemon-type-button');
    expect(btn.length).toBe(numberOfButtons);
  });
});
