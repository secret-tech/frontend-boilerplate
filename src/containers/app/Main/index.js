import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import { increment, decrement } from '../../../redux/modules/app/counter';

import ToJS from '../../../components/common/ToJS';
import Nav from '../../../components/app/Nav';
import Dashboard from '../../../components/app/Dashboard';
import Settings from '../../../components/app/Settings';

// import * as routes from '../../../routes';
import s from './styles.scss';

const Main = (props) => {
  const {
    counter,
    increment,
    decrement
  } = props;

  return (
    <div>
      <Nav/>
      <Switch>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/settings" component={Settings}/>
      </Switch>
      <div className={s.counter}>
        counter: {counter}
        <button onClick={() => increment()}>increment</button>
        <button onClick={() => decrement()}>decrement</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ counter: state.get('app').get('counter').get('counter') });

const ConnectedComponent = connect(mapStateToProps, { increment, decrement })(ToJS(Main));
const ComponentWithRouter = withRouter(ConnectedComponent);
export default ComponentWithRouter;
