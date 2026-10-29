import React, { useState, useEffect } from 'react';
import { FaCodeBranch, FaGithub, FaStar } from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';
import { Reveal, SectionHeading } from './Editorial';
import '../assets/GitHubActivity.css';

const fallbackRepos = [
  { name: 'ai-taskflow-ui', descriptionKey: 'github.taskflowDescription', language: 'TypeScript', url: 'https://github.com/bhavik1094/ai-taskflow-ui' },
  { name: 'Portfolio', descriptionKey: 'github.portfolioDescription', language: 'JavaScript', url: 'https://github.com/bhavik1094/Portfolio' },
];
const langColors = { TypeScript: '#3178c6', JavaScript: '#a38312', 'C#': '#239120', HTML: '#e34f26', CSS: '#1572b6', Python: '#3572a5' };

const GitHubActivity = () => {
  const [reposList, setReposList] = useState(fallbackRepos);
  const [status, setStatus] = useState('loading');
  const { t } = useTranslation();
  const cards = t('github.cards', { returnObjects: true });

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;
    fetch('https://api.github.com/users/bhavik1094/repos?sort=pushed&per_page=6', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('GitHub request failed');
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Invalid GitHub response');
        const repos = data.filter((repo) => !repo.fork).slice(0, 4).map((repo) => ({
          name: repo.name, description: repo.description, language: repo.language,
          stars: repo.stargazers_count, forks: repo.forks_count, url: repo.html_url,
        }));
        if (!repos.length) throw new Error('No repositories returned');
        if (mounted) { setReposList(repos); setStatus('ready'); }
      })
      .catch(() => { if (mounted) setStatus('fallback'); });
    return () => { mounted = false; controller.abort(); };
  }, []);

  return <section className="editorial-section p2-github" id="github-activity" aria-labelledby="github-title">
    <div className="portfolio-container">
      <SectionHeading number="08" kicker={t('github.kicker')} title={t('github.title')} id="github-title" />
      <div className="github-editorial-grid">
        <Reveal className="github-overview">
          <a className="github-profile editorial-text-link" href="https://github.com/bhavik1094" target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" />@bhavik1094<HiArrowUpRight aria-hidden="true" /></a>
          <div className="github-practice-list">{cards.map((card) => <div className="github-practice" key={card.title}>
            <span>{card.title}</span><h3>{card.value}</h3><p>{card.detail}</p>
          </div>)}</div>
        </Reveal>
        <div className="github-repositories">
          <p className="github-fetch-status" role="status">{status === 'loading' ? t('github.loading') : status === 'fallback' ? t('github.fallback') : t('github.latest')}</p>
          <div className="github-repo-grid" aria-busy={status === 'loading'}>
            {reposList.map((repo, index) => <Reveal as="article" className="github-repo" key={repo.name} delay={index * 0.06}>
              <a className="github-repo-link" href={repo.url} target="_blank" rel="noreferrer">
                <div className="github-repo-top"><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><HiArrowUpRight aria-hidden="true" /></div>
                <h3>{repo.name}</h3>
                <p>{repo.description || (repo.descriptionKey ? t(repo.descriptionKey) : t('github.noDescription'))}</p>
                <div className="github-repo-meta">
                  {repo.language && <span className="github-language"><span style={{ background: langColors[repo.language] || 'var(--primary)' }} aria-hidden="true" />{repo.language}</span>}
                  {Number.isFinite(repo.stars) && <span aria-label={`${repo.stars} ${t('github.stars')}`}><FaStar aria-hidden="true" />{repo.stars}</span>}
                  {Number.isFinite(repo.forks) && <span aria-label={`${repo.forks} ${t('github.forks')}`}><FaCodeBranch aria-hidden="true" />{repo.forks}</span>}
                </div>
              </a>
            </Reveal>)}
          </div>
        </div>
      </div>
    </div>
  </section>;
};

export default GitHubActivity;
