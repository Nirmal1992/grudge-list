import React from 'react';
import ReactDOM from 'react-dom';
import { GrudeProvider } from './GrudgeContext';
import Application from './Application';

import './styles.css';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <GrudeProvider>
    <Application />
  </GrudeProvider>,
  rootElement
);
