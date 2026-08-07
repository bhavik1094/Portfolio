import React from 'react';
import Select, { components } from 'react-select';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';
import { supportedLanguages } from '../i18n';

const OptionLabel = ({ data }) => (
  <div className="language-option">
    <span className="language-flag">{data.flag}</span>
    <span>
      <strong>{data.nativeLabel}</strong>
      <small>{data.label}</small>
    </span>
  </div>
);

const SingleValue = (props) => (
  <components.SingleValue {...props}>
    <OptionLabel data={props.data} />
  </components.SingleValue>
);

const Option = (props) => (
  <components.Option {...props}>
    <OptionLabel data={props.data} />
  </components.Option>
);

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 42,
    minWidth: 190,
    background: 'var(--card)',
    borderColor: state.isFocused ? 'var(--primary)' : 'var(--border)',
    borderRadius: 999,
    boxShadow: state.isFocused ? '0 0 0 4px rgba(37, 99, 235, 0.12)' : 'none',
    cursor: 'pointer',
    transition: '180ms ease',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0 0.35rem 0 0.75rem',
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--text)',
    margin: 0,
  }),
  input: (base) => ({
    ...base,
    color: 'var(--text)',
  }),
  placeholder: (base) => ({
    ...base,
    color: 'var(--muted)',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? 'var(--primary)' : 'var(--muted)',
    paddingRight: 10,
  }),
  menu: (base) => ({
    ...base,
    overflow: 'hidden',
    marginTop: 10,
    background: 'var(--card-hover)',
    border: '1px solid var(--border)',
    borderRadius: 18,
    boxShadow: 'var(--shadow)',
    backdropFilter: 'blur(24px)',
  }),
  menuList: (base) => ({
    ...base,
    padding: 6,
  }),
  option: (base, state) => ({
    ...base,
    color: 'var(--text)',
    background: state.isSelected
      ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(13, 148, 136, 0.2))'
      : state.isFocused
        ? 'rgba(37, 99, 235, 0.08)'
        : 'transparent',
    borderRadius: 12,
    cursor: 'pointer',
  }),
};

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const selectedLanguage = supportedLanguages.find((language) => language.value === i18n.language) || supportedLanguages[0];

  const handleChange = (language) => {
    if (language?.value) {
      i18n.changeLanguage(language.value);
    }
  };

  return (
    <motion.div className="language-selector" whileHover={{ y: -2 }} transition={{ duration: 0.18 }}>
      <div className="language-label">
        <FaGlobe />
        <span>{t('language.label')}</span>
      </div>
      <Select
        classNamePrefix="portfolio-language"
        options={supportedLanguages}
        value={selectedLanguage}
        onChange={handleChange}
        styles={selectStyles}
        components={{ Option, SingleValue }}
        isSearchable
        menuPlacement="auto"
        placeholder={t('language.placeholder')}
        aria-label={t('language.ariaLabel')}
      />
    </motion.div>
  );
};

export default LanguageSelector;
