import { fromJS, Map } from 'immutable';
import { createReducer, createAction } from '../../../utils/actions';


export const INCREMENT = 'app/app/INCREMENT';
export const DECREMENT = 'app/app/DECREMENT';


export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);


const initialState = fromJS({
  counter: 0
});

export default createReducer({
  [INCREMENT]: (state) => (
    state.merge(Map({
      counter: state.get('counter') + 1
    }))
  ),

  [DECREMENT]: (state) => (
    state.merge(Map({
      counter: state.get('counter') - 1
    }))
  )
}, initialState);
