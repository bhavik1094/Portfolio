import React from 'react';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18n, { supportedLanguages } from './i18n';
import Projects, { ProjectArtwork } from './components/Projects';

const expectedProjects = [
  { id: 'aurelia-admin', title: 'Aurelia Admin', liveUrl: 'https://aurelia-admin-five.vercel.app/' },
  { id: 'invoxa', title: 'Invoxa', liveUrl: 'https://invoxa-beige.vercel.app/' },
  { id: 'adhyashakti-solar', title: 'Adhyashakti Solar', liveUrl: 'https://adhyashakti-solar.vercel.app/' },
  { id: 'shree-krishna-nasta-house', title: 'Shree Krishna Nasta House', liveUrl: 'https://www.shreekrishnanastahouse.com/' },
];
const projectTitles = () => screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);

beforeEach(async () => { await i18n.changeLanguage('en'); });

afterEach(async () => {
  cleanup();
  await i18n.changeLanguage('en');
  document.body.style.overflow = '';
});

test.each(supportedLanguages.map(({ value }) => value))('%s shows the same four current projects with their own links and source visibility', async (language) => {
  await i18n.changeLanguage(language);
  render(<Projects />);

  expect(projectTitles()).toEqual(expectedProjects.map(({ title }) => title));
  expect(screen.getByRole('group', { name: i18n.t('projects.title') }).querySelectorAll('button')).toHaveLength(3);
  const items = i18n.t('projects.items', { returnObjects: true });
  expect(items.map(({ id, title }) => ({ id, title }))).toEqual(expectedProjects.map(({ id, title }) => ({ id, title })));
  const featured = i18n.t('projects.featured', { returnObjects: true });
  expect(featured.id).toBe('aurelia-admin');
  expect(featured.title).toBe(items[0].title);
  expect(featured.overview).toBe(items[0].description);
  expect(featured.technologies).toEqual(items[0].technologies);
  for (const item of items) expect(item.screenshotAlt).toEqual(expect.stringContaining(item.title));

  for (const project of expectedProjects) {
    const article = screen.getByRole('heading', { level: 3, name: project.title }).closest('article');
    expect(within(article).getByRole('button', { name: `${i18n.t('projects.viewDetails')}: ${project.title}` })).toBeEnabled();
    const liveLink = within(article).getByRole('link', { name: `${i18n.t('projects.liveDemo')} — ${project.title}` });
    expect(liveLink).toHaveAttribute('href', project.liveUrl);
    const links = within(article).getAllByRole('link');
    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.rel.split(/\s+/)).toEqual(expect.arrayContaining(['noopener', 'noreferrer']));
    }
    if (project.id === 'shree-krishna-nasta-house') {
      expect(links).toHaveLength(2);
      expect(within(article).getByRole('link', { name: `${i18n.t('projects.github')} — ${project.title}` })).toHaveAttribute('href', 'https://github.com/bhavik1094');
    } else {
      expect(links).toHaveLength(1);
      expect(within(article).queryByRole('link', { name: `${i18n.t('projects.github')} — ${project.title}` })).not.toBeInTheDocument();
    }
  }

  expect(document.getElementById('projects')).not.toHaveTextContent(/AI TaskFlow|API Portal|Finance Portal|Employee Management/i);
});

test('dashboard and website filters show the correct sets and restore the complete lineup', async () => {
  render(<Projects />);
  const filters = [
    { key: 'filterDashboards', titles: ['Aurelia Admin', 'Invoxa'] },
    { key: 'filterWebsites', titles: ['Adhyashakti Solar', 'Shree Krishna Nasta House'] },
    { key: 'filterAll', titles: expectedProjects.map(({ title }) => title) },
  ];
  for (const { key, titles } of filters) {
    await userEvent.click(screen.getByRole('button', { name: i18n.t(`projects.${key}`) }));
    await waitFor(() => expect(projectTitles()).toEqual(titles));
    for (const filter of filters) {
      expect(screen.getByRole('button', { name: i18n.t(`projects.${filter.key}`) })).toHaveAttribute('aria-pressed', String(filter.key === key));
    }
  }
});

test('changing language preserves the selected website and its filter', async () => {
  render(<Projects />);
  await userEvent.click(screen.getByRole('button', { name: i18n.t('projects.filterWebsites') }));
  const trigger = screen.getByRole('button', { name: `${i18n.t('projects.viewDetails')}: Adhyashakti Solar` });
  trigger.focus();
  await userEvent.keyboard('{Enter}');

  await act(async () => { await i18n.changeLanguage('ja'); });

  const project = i18n.t('projects.items', { returnObjects: true }).find(({ id }) => id === 'adhyashakti-solar');
  const dialog = screen.getByRole('dialog', { name: 'Adhyashakti Solar' });
  expect(within(dialog).getByText(project.description)).toBeVisible();
  expect(within(dialog).getByRole('link')).toHaveAttribute('href', 'https://adhyashakti-solar.vercel.app/');
  expect(screen.getByRole('button', { name: i18n.t('projects.filterWebsites') })).toHaveAttribute('aria-pressed', 'true');
  await userEvent.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
  expect(projectTitles()).toEqual(['Adhyashakti Solar', 'Shree Krishna Nasta House']);
});

test('only existing screenshot assets are requested, with editorial artwork for missing files', () => {
  render(<Projects />);
  const items = i18n.t('projects.items', { returnObjects: true });
  for (const { id, title } of expectedProjects) {
    const article = screen.getByRole('heading', { level: 3, name: title }).closest('article');
    const artwork = article.querySelector('.work-art');
    if (existsSync(join(process.cwd(), 'public', 'images', 'projects', `${id}.webp`))) {
      const screenshot = within(article).getByRole('img', { name: items.find((item) => item.id === id).screenshotAlt });
      expect(screenshot).toHaveAttribute('src', `${import.meta.env.BASE_URL}images/projects/${id}.webp`);
      expect(screenshot).toHaveAttribute('loading', id === 'aurelia-admin' ? 'eager' : 'lazy');
      expect(artwork).not.toHaveAttribute('aria-hidden', 'true');
    } else {
      expect(within(article).queryByRole('img')).not.toBeInTheDocument();
      expect(artwork).toHaveAttribute('aria-hidden', 'true');
      expect(artwork).toHaveTextContent(title);
    }
  }
});

test.each([false, true])('an authentic screenshot has descriptive alt text and falls back safely on failure (featured: %s)', (featured) => {
  const project = {
    id: 'invoxa', title: 'Invoxa', tone: 'ink', technologies: ['React', 'TypeScript'],
    imageUrl: '/Portfolio/images/projects/invoxa.webp', screenshotAlt: 'Invoxa invoice dashboard',
  };
  const { container } = render(<ProjectArtwork project={project} number={2} featured={featured} />);
  const screenshot = screen.getByRole('img', { name: project.screenshotAlt });
  expect(screenshot).toHaveAttribute('src', project.imageUrl);
  expect(screenshot).toHaveAttribute('loading', featured ? 'eager' : 'lazy');
  expect(screenshot).toHaveAttribute('decoding', 'async');
  expect(screenshot).toHaveClass('work-art-image');
  expect(container.querySelector('.work-art')).not.toHaveAttribute('aria-hidden', 'true');

  fireEvent.error(screenshot);

  expect(screen.queryByRole('img')).not.toBeInTheDocument();
  expect(container.querySelector('.work-art')).toHaveAttribute('aria-hidden', 'true');
  expect(container.querySelector('.work-art')).toHaveTextContent(project.title);
  expect(container.querySelector('.work-art')).toHaveTextContent('React');
});
