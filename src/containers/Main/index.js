import React from 'react';
import { connect } from 'react-redux';

import { increment, decrement } from '../../redux/modules/app/app';

import s from './styles.css';

/**
 * Component
 */

const Main = (props) => {
  const {
    counter,
    increment: incrementAction,
    decrement: decrementAction
  } = props;

  return (
    <div className={s.hello}>
      <button type="button" onClick={() => decrementAction()}>-</button>
      Hello, {counter}
      <button type="button" onClick={() => incrementAction()}>+</button>
    </div>
  );
};

/**
 * Export
 */

export default connect(
  (state) => state.app.app,
  {
    increment,
    decrement
  }
)(Main);
