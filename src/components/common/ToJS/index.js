import React from 'react';
import { Iterable } from 'immutable';

const ToJS = (WrappedComponent) => (wrappedComponentProps) => {
  const key = 0;
  const value = 1;

  const propsJS = Object
    .entries(wrappedComponentProps)
    .reduce((newProps, wrappedComponentProp) => {
      newProps[wrappedComponentProp[key]] = Iterable.isIterable(wrappedComponentProp[value])
        ? wrappedComponentProp[value].toJS()
        : wrappedComponentProp[value];
      return newProps;
    }, {});

  return <WrappedComponent {...propsJS}/>;
};

export default ToJS;
