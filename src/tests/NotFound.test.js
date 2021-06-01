import React from 'react';
import App from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

test('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('apenas_uma_uri');
    const messegePageNotFound = getByText('Page requested not found');
    expect(messegePageNotFound).toBeInTheDocument(); 
});

test('Testa se a página mostra a imagem', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    history.push('apenas_uma_uri');
    const gifPikach = getAllByRole('img')[1];
    expect(gifPikach.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
