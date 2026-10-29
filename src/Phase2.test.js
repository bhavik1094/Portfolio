import React from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import i18n, { supportedLanguages } from './i18n';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Achievements from './components/Achievements';
import EngineeringMindset from './components/EngineeringMindset';
import GitHubActivity from './components/GitHubActivity';
import Contact, { contactEmailUrl } from './components/Contact';
import Footer from './components/Footer';

vi.mock('lottie-react', () => ({ default: () => null }));

beforeEach(async () => {
  await i18n.changeLanguage('en');
  vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  document.body.style.overflow = '';
});

test.each(supportedLanguages.map(({ value }) => value))('preserves section content and every technology in %s', async (language) => {
  await i18n.changeLanguage(language);
  render(<><About /><Experience /><Skills /><EngineeringMindset /><Education /><Achievements /><Contact /><Footer /></>);
  for (const section of ['about', 'experience', 'skills', 'mindset', 'education', 'achievements', 'contact']) {
    expect(screen.getByRole('heading', { level: 2, name: i18n.t(`${section}.title`) })).toBeVisible();
  }
  const skills = document.getElementById('skills');
  for (const group of i18n.t('skills.groups', { returnObjects: true })) {
    expect(within(skills).getByRole('heading', { name: group.title })).toBeVisible();
    for (const technology of group.items) expect(within(skills).getByText(technology)).toBeInTheDocument();
  }
  for (const paragraph of i18n.t('about.paragraphs', { returnObjects: true })) expect(screen.getByText(paragraph)).toBeVisible();
  for (const role of i18n.t('experience.roles', { returnObjects: true })) expect(screen.getByRole('heading', { name: role.company })).toBeVisible();
  expect(screen.getByRole('textbox', { name: i18n.t('contact.namePlaceholder') })).toBeRequired();
  expect(screen.getByRole('textbox', { name: i18n.t('contact.emailPlaceholder') })).toHaveAttribute('type', 'email');
});

test('project filters expose selection and keep only matching projects', async () => {
  render(<Projects />);
  const filter = screen.getByRole('button', { name: i18n.t('projects.filterAI') });
  await userEvent.click(filter);
  expect(filter).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: i18n.t('projects.filterAll') })).toHaveAttribute('aria-pressed', 'false');
  await waitFor(() => expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(1));
  expect(screen.queryByRole('heading', { name: 'Shree Krishna Nasta House' })).not.toBeInTheDocument();
});

test('project details open from the keyboard and restore focus on Escape', async () => {
  render(<Projects />);
  const project = i18n.t('projects.items', { returnObjects: true })[0];
  const trigger = screen.getByRole('button', { name: `${i18n.t('projects.viewDetails')}: ${project.title}` });
  trigger.focus();
  await userEvent.keyboard('{Enter}');
  const dialog = await screen.findByRole('dialog', { name: project.title });
  expect(dialog).toHaveAttribute('aria-modal', 'true');
  expect(within(dialog).getByText(project.description)).toBeVisible();
  expect(screen.getByRole('button', { name: i18n.t('projects.closeDetails') })).toHaveFocus();
  expect(document.body.style.overflow).toBe('hidden');
  await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
  expect(within(dialog).getAllByRole('link').at(-1)).toHaveFocus();
  await userEvent.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
});

test('shows the featured project once in every matching filter and retains its item details', async () => {
  render(<Projects />);
  const featured = i18n.t('projects.featured', { returnObjects: true });
  const item = i18n.t('projects.items', { returnObjects: true }).find((project) => /taskflow/i.test(project.title));
  for (const filter of ['filterAll', 'filterFullstack', 'filterAI', 'filterSaaS']) {
    await userEvent.click(screen.getByRole('button', { name: i18n.t(`projects.${filter}`) }));
    await waitFor(() => expect(screen.getAllByRole('heading', { level: 3 }).filter((heading) => /taskflow/i.test(heading.textContent))).toHaveLength(1));
    expect(screen.getByRole('heading', { level: 3, name: featured.title })).toBeVisible();
    expect(screen.getByText(featured.overview)).toBeVisible();
  }
  const trigger = screen.getByRole('button', { name: `${i18n.t('projects.viewDetails')}: ${item.title}` });
  trigger.focus();
  await userEvent.keyboard('{Enter}');
  const dialog = screen.getByRole('dialog', { name: item.title });
  expect(within(dialog).getByText(item.description)).toBeVisible();
  for (const technology of item.technologies) expect(within(dialog).getAllByText(technology).length).toBeGreaterThan(0);
  await userEvent.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
});

test.each(['fr', 'de', 'es', 'hi', 'gu', 'ja'])('links the translated TaskFlow project to its own destination in %s', async (language) => {
  await i18n.changeLanguage(language);
  render(<Projects />);
  const title = i18n.t('projects.items', { returnObjects: true })[0].title;
  const article = screen.getByRole('button', { name: `${i18n.t('projects.viewDetails')}: ${title}` }).closest('article');
  expect(within(article).getByRole('link', { name: new RegExp(i18n.t('projects.liveDemo')) })).toHaveAttribute('href', 'https://ai-task-alpha.vercel.app/');
});

test('discussing a project closes its dialog and retains the contact anchor', async () => {
  render(<Projects />);
  await userEvent.click(screen.getByRole('button', { name: `${i18n.t('projects.viewDetails')}: API Portal` }));
  const dialog = screen.getByRole('dialog', { name: 'API Portal' });
  const discuss = within(dialog).getByRole('link', { name: `${i18n.t('projects.discussProject')} — API Portal` });
  expect(discuss).toHaveAttribute('href', '#contact');
  await userEvent.click(discuss);
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

test('GitHub loading resolves to current non-fork repository data', async () => {
  let resolve;
  fetch.mockImplementation(() => new Promise((done) => { resolve = done; }));
  render(<GitHubActivity />);
  expect(screen.getByRole('status')).toHaveTextContent(i18n.t('github.loading'));
  await act(async () => resolve({ ok: true, json: async () => [
    { name: 'Forked sample', fork: true },
    { name: 'Real repository', fork: false, description: 'API description', language: 'C#', stargazers_count: 0, forks_count: 2, html_url: 'https://github.com/bhavik1094/real' },
  ] }));
  expect(await screen.findByRole('heading', { name: 'Real repository' })).toBeVisible();
  expect(screen.queryByText('Forked sample')).not.toBeInTheDocument();
  expect(screen.getByLabelText(`0 ${i18n.t('github.stars')}`)).toBeVisible();
  expect(screen.getByLabelText(`2 ${i18n.t('github.forks')}`)).toBeVisible();
  expect(screen.getByRole('status')).toHaveTextContent(i18n.t('github.latest'));
});

test.each(['network', 'http', 'empty'])('GitHub preserves usable fallback links without invented counts after %s failure', async (failure) => {
  fetch.mockImplementation(() => failure === 'network' ? Promise.reject(new Error('Offline')) : Promise.resolve({ ok: failure !== 'http', json: async () => [] }));
  render(<GitHubActivity />);
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(i18n.t('github.fallback')));
  expect(screen.getByRole('link', { name: /ai-taskflow-ui/ })).toHaveAttribute('href', 'https://github.com/bhavik1094/ai-taskflow-ui');
  expect(screen.queryByLabelText(new RegExp(i18n.t('github.stars')))).not.toBeInTheDocument();
  expect(screen.queryByLabelText(new RegExp(i18n.t('github.forks')))).not.toBeInTheDocument();
});

const fillContact = async () => {
  await userEvent.type(screen.getByRole('textbox', { name: i18n.t('contact.namePlaceholder') }), 'Visitor & Team');
  await userEvent.type(screen.getByRole('textbox', { name: i18n.t('contact.emailPlaceholder') }), 'visitor@example.com');
  await userEvent.type(screen.getByRole('textbox', { name: i18n.t('contact.messagePlaceholder') }), 'Discuss React & .NET');
};

test('contact submits the existing payload once and clears fields after success', async () => {
  let resolve;
  fetch.mockImplementation(() => new Promise((done) => { resolve = done; }));
  render(<Contact />);
  await fillContact();
  await userEvent.click(screen.getByRole('button', { name: i18n.t('contact.send') }));
  expect(screen.getByRole('button', { name: i18n.t('contact.sending') })).toBeDisabled();
  fireEvent.submit(screen.getByRole('form'));
  expect(fetch).toHaveBeenCalledTimes(1);
  const [url, request] = fetch.mock.calls[0];
  expect(url).toBe('https://formsubmit.co/ajax/bmpatel1994@gmail.com');
  expect(request.method).toBe('POST');
  expect(JSON.parse(request.body)).toEqual({ name: 'Visitor & Team', email: 'visitor@example.com', message: 'Discuss React & .NET', _subject: 'Portfolio Contact from Visitor & Team' });
  await act(async () => resolve({ ok: true }));
  expect(screen.getByRole('button', { name: i18n.t('contact.sent') })).toBeEnabled();
  for (const field of screen.getAllByRole('textbox')) expect(field).toHaveValue('');
});

test.each(['network', 'http'])('contact keeps the draft and announces the email fallback after %s failure', async (failure) => {
  // JSDOM cannot launch a mail client. Verify feedback/draft and the encoded URL separately.
  const originalError = console.error;
  vi.spyOn(console, 'error').mockImplementation((...args) => { if (!String(args[0]).includes('Not implemented: navigation')) originalError(...args); });
  fetch.mockImplementation(() => failure === 'network' ? Promise.reject(new Error('Offline')) : Promise.resolve({ ok: false }));
  render(<Contact />);
  await fillContact();
  await act(async () => { await userEvent.click(screen.getByRole('button', { name: i18n.t('contact.send') })); });
  await waitFor(() => expect(screen.getByText(i18n.t('contact.fallbackNotice'))).toBeVisible());
  expect(screen.getByRole('textbox', { name: i18n.t('contact.messagePlaceholder') })).toHaveValue('Discuss React & .NET');
  const url = new URL(contactEmailUrl({ name: 'Visitor & Team', email: 'visitor@example.com', message: 'Discuss React & .NET' }));
  expect(url.pathname).toBe('bmpatel1994@gmail.com');
  expect(url.searchParams.get('subject')).toBe('Portfolio Contact from Visitor & Team');
  expect(url.searchParams.get('body')).toContain('Discuss React & .NET');
});
