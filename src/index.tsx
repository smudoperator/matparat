import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/global.css';  // Import global styles
import App from './App';
import reportWebVitals from './reportWebVitals';

// Check if URL contains uppercase letters and redirect to lowercase URL
const currentUrl = window.location.href;
const lowercaseUrl = currentUrl.toLowerCase();

if (currentUrl !== lowercaseUrl) {
  window.location.href = lowercaseUrl;
} else {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
