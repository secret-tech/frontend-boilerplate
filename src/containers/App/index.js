import React from 'react';
import s from './styles.css';

const Main = () => (
  <div className={s.main}>
    <img src={require('./images/chvrches.jpg')}/>
    <div>Hello, world!</div>
  </div>
);

export default Main;
