// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css'; // Import your styles
import App from './App'; // Import the App component

// Create the root and render the app
const root = createRoot(document.getElementById('root')); // Create root element once
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
