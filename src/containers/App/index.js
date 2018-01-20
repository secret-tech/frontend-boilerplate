import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';
import { increment, decrement } from '../../redux/modules/app/app';

const Main = (props) => {
  const {
    counter,
    increment,
    decrement,
  } = props;

  return (
    <div className={s.main}>
      <div className={s.counterWrapper}>
        <button className={s.button} type="button" onClick={() => decrement()}>-</button>
        <span className={s.counter}>counter: {counter}</span>
        <button className={s.button} type="button" onClick={() => increment()}>+</button>
      </div>
    </div>
  );
};

export default connect(
  (state) => state.app.app,
  {
    increment,
    decrement
  }
)(Main);
