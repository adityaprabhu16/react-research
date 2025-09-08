import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from "./App";

import './index.css';

const rootId = document.getElementById("root");
const root = createRoot(rootId);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)