import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './app/App.tsx';
import { ThemeProvider } from './app/providers/ThemeProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
