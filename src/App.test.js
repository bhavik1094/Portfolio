import React from 'react';
import { act, cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MotionConfig } from 'framer-motion';
import { vi } from 'vitest';
import i18n, { supportedLanguages } from './i18n';
import App from './App';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

// The animated illustration and external GitHub service are outside Phase 1.
vi.mock('lottie-react', () => ({ default: () => null }));

const resumePath = `${import.meta.env.BASE_URL}Bhavik%20M%20Patel%20Resume.pdf`;
const renderHero = () => render(<MotionConfig reducedMotion="user"><Hero /></MotionConfig>);

beforeEach(async () => {
  localStorage.clear();
  document.body.classList.remove('dark');
  window.history.replaceState({}, '', '/');
  // GitHub response states are covered in Phase2.test.js. Keep this unrelated
  // request pending so these synchronous navigation tests have no async updates.
  vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
  await i18n.changeLanguage('en');
});

afterEach(async () => {
  cleanup();
  await i18n.changeLanguage('en');
  vi.unstubAllGlobals();
  vi.clearAllMocks();
  document.body.style.overflow = '';
});

test('starts in light mode and persists the theme toggle across visits', async () => {
  const firstVisit = render(<App />);
  await userEvent.click(screen.getByRole('button', { name: i18n.t('nav.toggleNavigation') }));
  const toggle = screen.getByRole('button', { name: i18n.t('nav.toggleTheme') });

  expect(document.body).not.toHaveClass('dark');
  await userEvent.click(toggle);
  expect(document.body).toHaveClass('dark');
  expect(localStorage.getItem('portfolioTheme')).toBe('dark');

  firstVisit.unmount();
  render(<App />);
  expect(document.body).toHaveClass('dark');
  await userEvent.click(screen.getByRole('button', { name: i18n.t('nav.toggleNavigation') }));
  await userEvent.click(screen.getByRole('button', { name: i18n.t('nav.toggleTheme') }));
  expect(document.body).not.toHaveClass('dark');
  expect(localStorage.getItem('portfolioTheme')).toBe('light');
});

test('language switching preserves the contact draft and selected project filter', async () => {
  render(<App />);
  const nameField = screen.getByPlaceholderText(i18n.t('contact.namePlaceholder'));
  await userEvent.type(nameField, 'A portfolio visitor');
  await userEvent.click(screen.getByRole('button', { name: i18n.t('projects.filterAI') }));
  const projectSection = document.getElementById('projects');
  await waitFor(() => expect(within(projectSection).getAllByRole('heading', { level: 3 })).toHaveLength(1));

  await act(async () => { await i18n.changeLanguage('fr'); });

  expect(screen.getByPlaceholderText(i18n.t('contact.namePlaceholder'))).toHaveValue('A portfolio visitor');
  await waitFor(() => expect(within(projectSection).getAllByRole('heading', { level: 3 })).toHaveLength(1));
  expect(document.documentElement).toHaveAttribute('lang', 'fr');
  expect(localStorage.getItem('portfolioLanguage')).toBe('fr');
  expect(fetch).not.toHaveBeenCalledWith(expect.stringContaining('formsubmit'), expect.anything());
});

test.each(supportedLanguages.map(({ value }) => value))('renders the professional identity and working resume actions in %s', async (language) => {
  await i18n.changeLanguage(language);
  renderHero();

  expect(screen.getByRole('heading', {
    level: 1,
    name: `${i18n.t('hero.displayFirst')} ${i18n.t('hero.displaySecond')}`,
  })).toBeVisible();
  expect(screen.getByText(i18n.t('hero.headline'))).toBeInTheDocument();
  expect(screen.getByRole('button', { name: i18n.t('hero.previewResume') })).toBeEnabled();
  expect(screen.getByRole('link', { name: i18n.t('hero.downloadResume') })).toHaveAttribute('href', resumePath);
});

test('compact navigation exposes its state, closes on Escape and restores toggle focus', async () => {
  render(<Navbar darkMode={false} setDarkMode={vi.fn()} />);
  const toggle = screen.getByRole('button', { name: i18n.t('nav.toggleNavigation') });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');

  await userEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  const panel = document.getElementById(toggle.getAttribute('aria-controls'));
  expect(within(panel).getByRole('link', { name: i18n.t('nav.projects') })).toHaveAttribute('href', '#projects');
  await userEvent.keyboard('{Escape}');

  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveFocus();
  await waitFor(() => expect(document.getElementById('site-navigation-panel')).not.toBeInTheDocument());
});

test('choosing a compact navigation link keeps the anchor and closes the menu', async () => {
  render(<Navbar darkMode={false} setDarkMode={vi.fn()} />);
  const toggle = screen.getByRole('button', { name: i18n.t('nav.toggleNavigation') });
  await userEvent.click(toggle);
  const panel = document.getElementById(toggle.getAttribute('aria-controls'));
  const skillsLink = within(panel).getByRole('link', { name: i18n.t('nav.skills') });
  expect(skillsLink).toHaveAttribute('href', '#skills');
  await userEvent.click(skillsLink);
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await waitFor(() => expect(document.getElementById('site-navigation-panel')).not.toBeInTheDocument());
});

test('active section tracking retains an observation area on a wide desktop viewport', async () => {
  const originalHeight = window.innerHeight;
  const originalWidth = window.innerWidth;
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: 900 });
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1440 });
  const observers = [];
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback, options = {}) { this.callback = callback; this.options = options; observers.push(this); }
    observe() {}
    unobserve() {}
    disconnect() {}
  });
  try {
    render(<App />);
    const tracker = observers.find(({ options }) => options.rootMargin);
    // Evaluate the actual observer band according to the browser's margin rules.
    const margins = tracker.options.rootMargin.split(' ').map((part) => part.endsWith('%') ? parseFloat(part) * window.innerWidth / 100 : parseFloat(part));
    expect(window.innerHeight + margins[0] + margins[2]).toBeGreaterThan(0);
    act(() => tracker.callback([{ target: document.getElementById('skills'), isIntersecting: true }]));
    const nav = screen.getByRole('navigation', { name: i18n.t('nav.mainLabel') });
    expect(within(nav).getByRole('link', { name: i18n.t('nav.skills') })).toHaveAttribute('aria-current', 'location');
  } finally {
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: originalHeight });
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth });
  }
});

test('the language selector changes the visible professional title', async () => {
  render(<App />);
  await userEvent.click(screen.getByRole('button', { name: i18n.t('nav.toggleNavigation') }));
  await userEvent.click(screen.getByRole('combobox', { name: i18n.t('language.ariaLabel') }));
  await userEvent.click(screen.getByRole('option', { name: /Français/ }));
  expect(screen.getByRole('heading', { level: 1 })).toHaveAccessibleName('Full-stack Ingénieur');
  expect(localStorage.getItem('portfolioLanguage')).toBe('fr');
});

test('resume preview opens the real PDF and returns focus on Escape', async () => {
  renderHero();
  const preview = screen.getByRole('button', { name: i18n.t('hero.previewResume') });
  await userEvent.click(preview);
  const dialog = await screen.findByRole('dialog', { name: i18n.t('resume.title') });

  expect(dialog).toHaveAttribute('aria-modal', 'true');
  expect(within(dialog).getByTitle(i18n.t('resume.iframeTitle'))).toHaveAttribute('src', resumePath);
  expect(within(dialog).getByRole('link', { name: i18n.t('resume.download') })).toHaveAttribute('href', resumePath);
  const close = within(dialog).getByRole('button', { name: i18n.t('resume.closeAria') });
  await waitFor(() => expect(close).toHaveFocus());
  expect(document.body.style.overflow).toBe('hidden');

  await userEvent.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(preview).toHaveFocus();
  expect(document.body.style.overflow).not.toBe('hidden');
});

test('copy email writes the real address and announces feedback', async () => {
  renderHero();
  await act(async () => { await userEvent.click(screen.getByRole('button', { name: i18n.t('hero.copyEmail') })); });
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('bmpatel1994@gmail.com');
  expect(await screen.findByRole('status')).toHaveTextContent('bmpatel1994@gmail.com');
  expect(screen.getByRole('button', { name: i18n.t('hero.copied') })).toBeEnabled();
});

test('reduced-motion visitors can read the title and portrait immediately', () => {
  expect(window.matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(true);
  renderHero();
  expect(screen.getByRole('heading', { level: 1 })).toBeVisible();
  expect(screen.getByRole('img', { name: 'Bhavik Patel' })).toBeVisible();
});
