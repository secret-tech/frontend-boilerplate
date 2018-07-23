import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <nav>
    <Link to="/">Dashboard</Link>
    <Link to="/settings">Settings</Link>
  </nav>
);
