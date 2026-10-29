import React from 'react';
import { act, cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import i18n, { supportedLanguages } from './i18n';
import App from './App';

vi.mock('lottie-react', () => ({ default: () => null }));

const resumePath = `${import.meta.env.BASE_URL}Bhavik%20M%20Patel%20Resume.pdf`;
const variants = supportedLanguages.flatMap(({ value }) => ['light', 'dark'].map((theme) => [value, theme]));

beforeEach(() => {
  localStorage.clear();
  document.body.classList.remove('dark');
  window.history.replaceState({}, '', '/Portfolio/');
  vi.stubGlobal('fetch', vi.fn((url) => url.includes('formsubmit.co')
    ? Promise.resolve({ ok: true }) : new Promise(() => {})));
});

afterEach(async () => {
  cleanup();
  await i18n.changeLanguage('en');
  document.body.classList.remove('dark');
  document.body.style.overflow = '';
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

test.each(variants)('%s in %s mode preserves navigation, dialogs, filters and form labels', async (language, theme) => {
  localStorage.setItem('portfolioTheme', theme);
  await i18n.changeLanguage(language);
  render(<App />);

  expect(document.documentElement).toHaveAttribute('lang', language);
  expect(document.documentElement).toHaveAttribute('data-reduced-motion', 'true');
  expect(document.body.classList.contains('dark')).toBe(theme === 'dark');
  expect(document.documentElement.style.colorScheme).toBe(theme);
  expect(screen.getByRole('heading', { level: 1 })).toHaveAccessibleName(`${i18n.t('hero.displayFirst')} ${i18n.t('hero.displaySecond')}`);
  for (const section of ['about', 'projects', 'experience', 'skills', 'education', 'achievements', 'contact']) {
    expect(screen.getByRole('heading', { level: 2, name: i18n.t(`${section}.title`) })).toBeVisible();
  }

  const menuToggle = screen.getByRole('button', { name: i18n.t('nav.toggleNavigation') });
  await userEvent.click(menuToggle);
  const navigation = screen.getByRole('navigation', { name: i18n.t('nav.mainLabel') });
  const themeToggle = within(navigation).getByRole('button', { name: i18n.t('nav.toggleTheme') });
  expect(themeToggle).toHaveAttribute('aria-pressed', String(theme === 'dark'));
  expect(within(navigation).getByRole('link', { name: i18n.t('nav.projects') })).toHaveAttribute('href', '#projects');
  await userEvent.keyboard('{Escape}');
  expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  await waitFor(() => expect(document.getElementById('site-navigation-panel')).not.toBeInTheDocument());

  const preview = screen.getByRole('button', { name: i18n.t('hero.previewResume') });
  await userEvent.click(preview);
  const resume = screen.getByRole('dialog', { name: i18n.t('resume.title') });
  expect(within(resume).getByTitle(i18n.t('resume.iframeTitle'))).toHaveAttribute('src', resumePath);
  expect(within(resume).getByRole('link', { name: i18n.t('resume.download') })).toHaveAttribute('href', resumePath);
  await userEvent.click(within(resume).getByRole('button', { name: i18n.t('resume.closeAria') }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(preview).toHaveFocus();

  const project = i18n.t('projects.items', { returnObjects: true })[0];
  const projectTrigger = screen.getByRole('button', { name: `${i18n.t('projects.viewDetails')}: ${project.title}` });
  await userEvent.click(projectTrigger);
  const details = screen.getByRole('dialog', { name: project.title });
  expect(within(details).getByText(project.description)).toBeVisible();
  await userEvent.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(projectTrigger).toHaveFocus();

  const aiFilter = screen.getByRole('button', { name: i18n.t('projects.filterAI') });
  await userEvent.click(aiFilter);
  expect(aiFilter).toHaveAttribute('aria-pressed', 'true');
  const projects = document.getElementById('projects');
  await waitFor(() => expect(within(projects).getAllByRole('heading', { level: 3 })).toHaveLength(1));

  for (const key of ['namePlaceholder', 'emailPlaceholder', 'messagePlaceholder']) {
    expect(screen.getByRole('textbox', { name: i18n.t(`contact.${key}`) })).toBeRequired();
  }
  expect(screen.getByRole('button', { name: i18n.t('contact.send') })).toBeEnabled();
  expect(fetch.mock.calls.some(([url]) => url.includes('formsubmit.co'))).toBe(false);
});

test('the integrated French dark-mode contact form submits the preserved payload', async () => {
  localStorage.setItem('portfolioTheme', 'dark');
  await i18n.changeLanguage('fr');
  render(<App />);
  await userEvent.type(screen.getByRole('textbox', { name: i18n.t('contact.namePlaceholder') }), 'Portfolio Visitor');
  await userEvent.type(screen.getByRole('textbox', { name: i18n.t('contact.emailPlaceholder') }), 'visitor@example.com');
  await userEvent.type(screen.getByRole('textbox', { name: i18n.t('contact.messagePlaceholder') }), 'Discuss a project');
  await act(async () => { await userEvent.click(screen.getByRole('button', { name: i18n.t('contact.send') })); });
  await waitFor(() => expect(screen.getByRole('button', { name: i18n.t('contact.sent') })).toBeEnabled());
  const submissions = fetch.mock.calls.filter(([url]) => url.includes('formsubmit.co'));
  expect(submissions).toHaveLength(1);
  expect(submissions[0][0]).toBe('https://formsubmit.co/ajax/bmpatel1994@gmail.com');
  expect(JSON.parse(submissions[0][1].body)).toEqual({
    name: 'Portfolio Visitor', email: 'visitor@example.com', message: 'Discuss a project',
    _subject: 'Portfolio Contact from Portfolio Visitor',
  });
  expect(screen.getByRole('textbox', { name: i18n.t('contact.messagePlaceholder') })).toHaveValue('');
});
