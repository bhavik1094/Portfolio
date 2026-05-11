import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiDownload } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

const resumePath = '/Bhavik%20M%20Patel%20Resume.pdf';

const ResumeModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="modal-overlay resume-modal-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="resume-modal-content"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.96 }}
          >
            <div className="resume-modal-header">
              <div>
                <span className="section-kicker">{t('resume.kicker')}</span>
                <h3>{t('resume.title')}</h3>
              </div>
              <button className="close-button" onClick={onClose} type="button" aria-label={t('resume.closeAria')}>x</button>
            </div>
            <iframe src={resumePath} title={t('resume.iframeTitle')} className="resume-frame" />
            <div className="resume-modal-actions">
              <a href={resumePath} className="button button-primary" download><HiDownload /> {t('resume.download')}</a>
              <button className="button button-secondary" onClick={onClose} type="button">{t('resume.close')}</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
