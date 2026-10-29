import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import i18n from './i18n';
import Navbar from './components/Navbar';

beforeEach(async () => { await i18n.changeLanguage('en'); });
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

test('Escape closes language choices before closing compact navigation', async () => {
  render(<Navbar darkMode={false} setDarkMode={vi.fn()} />);
  const toggle = screen.getByRole('button', { name: i18n.t('nav.toggleNavigation') });
  await userEvent.click(toggle);
  const language = screen.getByRole('combobox', { name: i18n.t('language.ariaLabel') });
  await userEvent.click(language);
  expect(language).toHaveAttribute('aria-expanded', 'true');

  await userEvent.keyboard('{Escape}');
  expect(language).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(language).toHaveFocus();

  await userEvent.keyboard('{Escape}');
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveFocus();
  await waitFor(() => expect(document.getElementById('site-navigation-panel')).not.toBeInTheDocument());
});

test('a compact navigation keyboard link moves focus to the destination heading', async () => {
  render(<><Navbar darkMode={false} setDarkMode={vi.fn()} /><section id="skills"><h2>Technical toolkit destination</h2></section></>);
  await userEvent.click(screen.getByRole('button', { name: i18n.t('nav.toggleNavigation') }));
  const link = screen.getByRole('link', { name: i18n.t('nav.skills') });
  link.focus();
  await userEvent.keyboard('{Enter}');
  await waitFor(() => expect(document.getElementById('site-navigation-panel')).not.toBeInTheDocument());
  expect(screen.getByRole('heading', { name: 'Technical toolkit destination' })).toHaveFocus();
  expect(window.location.hash).toBe('#skills');
});
