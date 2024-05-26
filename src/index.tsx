// in src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Adicionar  from './pages/Adicionar';

const root = ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Adicionar />
    </React.StrictMode>
);