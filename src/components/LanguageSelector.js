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
    background: 'rgba(255, 255, 255, 0.06)',
    borderColor: state.isFocused ? 'rgba(20, 184, 166, 0.55)' : 'rgba(255, 255, 255, 0.10)',
    borderRadius: 999,
    boxShadow: state.isFocused ? '0 0 0 4px rgba(20, 184, 166, 0.12)' : 'none',
    cursor: 'pointer',
    transition: '180ms ease',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0 0.35rem 0 0.75rem',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#f8fafc',
    margin: 0,
  }),
  input: (base) => ({
    ...base,
    color: '#f8fafc',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#94a3b8',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? '#14b8a6' : '#94a3b8',
    paddingRight: 10,
  }),
  menu: (base) => ({
    ...base,
    overflow: 'hidden',
    marginTop: 10,
    background: 'rgba(3, 7, 18, 0.94)',
    border: '1px solid rgba(255, 255, 255, 0.10)',
    borderRadius: 18,
    boxShadow: '0 24px 80px rgba(0, 0, 0, 0.45)',
    backdropFilter: 'blur(24px)',
  }),
  menuList: (base) => ({
    ...base,
    padding: 6,
  }),
  option: (base, state) => ({
    ...base,
    color: '#f8fafc',
    background: state.isSelected
      ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.28), rgba(20, 184, 166, 0.24))'
      : state.isFocused
        ? 'rgba(255, 255, 255, 0.08)'
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
