import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Todos from './Todos';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Todos />
  </StrictMode>
);