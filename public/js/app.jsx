import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
    return <h1>Hello from React!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(<App />);
