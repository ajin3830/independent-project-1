import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
// <React.StrictMode> tags removed to disable StrickMode
// StrictMode renders components twice (on dev but not production),
// for example when you console log, it gets logged twice,
//  in order to detect any problems with your code 
// and warn you about them (which can be quite useful).
// It's automatically enabled by default when you used create-react-app.
