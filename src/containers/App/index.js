import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';

import { increment, decrement } from '../../redux/modules/app/app';

import ToggleLang from '../../components/ToggleLang';

/**
 * Component
 */

const Main = (props) => {
  const {
    t,
    counter,
    increment: incrementAction,
    decrement: decrementAction
  } = props;

  return (
    <div className={s.landing}>
      <div className={s.lang}>
        <ToggleLang/>
      </div>

      <div className={s.container}>
        <h1 className={s.title}>{t('common:title')}</h1>
        <h3 className={s.description}>{t('app:description')}</h3>
      </div>

      <div className={s.counterWrapper}>
        <button className={s.button} type="button" onClick={() => decrementAction()}>-</button>
        <span className={s.counter}>{t('app:counter')}: {counter}</span>
        <button className={s.button} type="button" onClick={() => incrementAction()}>+</button>
      </div>
    </div>
  );
};

/**
 * Export
 */

const TranslatedComponent = translate('app')(Main);

export default connect(
  (state) => state.app.app,
  {
    increment,
    decrement
  }
)(TranslatedComponent);
