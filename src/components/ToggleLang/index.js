import React from 'react';
import s from './styles.css';
import i18n from '../../utils/i18next';

const ToggleLang = () => {
  const toggle = (lang) => i18n.changeLanguage(lang);

  return (
    <div className={s.toggle}>
      <button className={s.button} type="button" onClick={() => toggle('en')}>en</button>
      <button className={s.button} type="button" onClick={() => toggle('ru')}>ru</button>
    </div>
  );
};

export default ToggleLang;
