import React from 'react';
import ReactDOM from 'react-dom/client';
import { audioService } from './utils/AudioService';
import './styles/main.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

audioService.init();


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { audioService } from './utils/AudioService';
// import './styles/main.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// audioService.init();

// reportWebVitals();