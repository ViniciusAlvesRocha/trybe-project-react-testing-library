import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
test('Testando se é exibido na tela a mensagem No favorite pokemon', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const paragraphNoFavoritePokemon = getByText(/No favorite pokemon/);
    expect(paragraphNoFavoritePokemon).toBeInTheDocument;
});

test('Verificando se são exibidos todos os cards dos pokemons favoritados', () => {
    //definindo o Pikachu pokemon como favorito:
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    history.push('pokemons/25');
    userEvent.click(getByText('Pokémon favoritado?'));

    const linkFavorites = getByRole('link', {name: 'Favorite Pokémons'});
    userEvent.click(linkFavorites);

    const pikach = getByText('Pikachu');
    expect(pikach).toBeInTheDocument();
});

test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const messegeNotFound = getByText('No favorite pokemon found');
    expect(messegeNotFound).toBeInTheDocument();
});
