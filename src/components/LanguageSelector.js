import React from 'react';
import Select, { components } from 'react-select';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';
import { supportedLanguages } from '../i18n';

const SingleValue = (props) => <components.SingleValue {...props}><span className="site-language-value"><FaGlobe aria-hidden="true" />{props.data.value.toUpperCase()}</span></components.SingleValue>;
const Option = (props) => <components.Option {...props}><span className="site-language-option"><span aria-hidden="true">{props.data.flag}</span><strong>{props.data.nativeLabel}</strong><small>{props.data.label}</small></span></components.Option>;
const styles = {
  control: (base, state) => ({ ...base, minHeight: 44, minWidth: 84, background: 'transparent', borderColor: state.isFocused ? 'var(--primary)' : 'transparent', borderRadius: 99, boxShadow: 'none', cursor: 'pointer' }),
  singleValue: (base) => ({ ...base, color: 'var(--text)' }),
  input: (base) => ({ ...base, color: 'var(--text)' }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base) => ({ ...base, color: 'var(--muted)', padding: 4 }),
  valueContainer: (base) => ({ ...base, padding: '2px 5px 2px 8px' }),
  menu: (base) => ({ ...base, minWidth: 200, right: 0, color: 'var(--text)', background: 'var(--card-hover)', border: '1px solid var(--border)', borderRadius: 16, padding: 4, boxShadow: 'var(--shadow)', zIndex: 20 }),
  option: (base, state) => ({ ...base, background: state.isSelected ? 'var(--accent-soft)' : state.isFocused ? 'var(--bg-2)' : 'transparent', color: 'var(--text)', borderRadius: 9, cursor: 'pointer', padding: '10px 12px' }),
};

const LanguageSelector = ({ alignMenu = 'right' }) => {
  const { t, i18n } = useTranslation();
  const alignedStyles = {
    ...styles,
    menu: (base) => ({ ...styles.menu(base), left: alignMenu === 'left' ? 0 : 'auto', right: alignMenu === 'right' ? 0 : 'auto' }),
  };
  return <div className="site-language-selector"><Select instanceId="portfolio-language" inputId="portfolio-language-input" classNamePrefix="site-language" options={supportedLanguages} value={supportedLanguages.find((language) => language.value === i18n.resolvedLanguage) || supportedLanguages[0]} onChange={(language) => { if (language) i18n.changeLanguage(language.value); }} onKeyDown={(event) => {
    // Let Select close its choices, then let a second Escape close navigation.
    if (event.key === 'Escape' && event.target.getAttribute('aria-expanded') === 'true') event.stopPropagation();
  }} components={{ SingleValue, Option }} styles={alignedStyles} isSearchable menuPlacement={alignMenu === 'left' ? 'top' : 'auto'} aria-label={t('language.ariaLabel')} /></div>;
};

export default LanguageSelector;
