import React, { useId } from 'react';
import { HiDownload, HiX } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import AccessibleDialog from './AccessibleDialog';

const resumePath = `${import.meta.env.BASE_URL}Bhavik%20M%20Patel%20Resume.pdf`;

const ResumeModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const titleId = useId();

  return (
    <AccessibleDialog isOpen={isOpen} onClose={onClose} titleId={titleId}>
      <div className="portfolio-dialog-header">
        <div>
          <span className="portfolio-dialog-kicker">{t('resume.kicker')}</span>
          <h2 className="portfolio-dialog-title" id={titleId}>{t('resume.title')}</h2>
        </div>
        <button className="portfolio-dialog-close" data-dialog-close onClick={onClose} type="button" aria-label={t('resume.closeAria')}><HiX aria-hidden="true" /></button>
      </div>
      <iframe src={resumePath} title={t('resume.iframeTitle')} className="portfolio-dialog-frame" />
      <div className="portfolio-dialog-actions">
        <a href={resumePath} className="button button-primary" download><HiDownload aria-hidden="true" /> {t('resume.download')}</a>
        <button className="button button-secondary" onClick={onClose} type="button">{t('resume.close')}</button>
      </div>
    </AccessibleDialog>
  );
};

export default ResumeModal;
