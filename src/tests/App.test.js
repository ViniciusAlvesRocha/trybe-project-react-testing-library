import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});
//Verificando se a página tem um link com texto Home
test('Verificando se a página tem um link com texto Home', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  expect(getAllByRole('link')[0].textContent).toBe('Home');
});

test('Verifica se quando eu clico no link About, a aplicação me manda para a endpoint /about', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  const linkAbout = getByRole('link', {
    name: 'About'
  });
  userEvent.click(linkAbout);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/about');
})

test('Verifica se quando eu clico no link Favorite Pokémons, a aplicação me manda para a endpoint /favorites', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  const linkFavorites = getByRole('link', {
    name: 'Favorite Pokémons',
  });
  userEvent.click(linkFavorites);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/favorites');
})

test('Verifica se quando eu digito um URI que não existe na minha aplicação, ele me redireciona para a página de Not Fount', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/apenas-uma-uri-desconhecida');
  expect(getByText('Page requested not found')).toBeInTheDocument();
})