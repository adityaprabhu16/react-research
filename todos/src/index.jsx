import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

//Import App and inject it within our DOM (index.html)

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);