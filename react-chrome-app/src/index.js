import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";

const globalStyles = document.createElement("style");



globalStyles.innerHTML = `
  #${rootElement.id}{
    position: fixed;
    left: 0;
    top: 0;
    z-index:2147483647!important; 
    width: 300px;
    max-height: 100vh;
    min-height:100vh;
    overflow:scroll;
    background-color: white; 
    border-right: 1px solid #c2c2c2; 
  }
`;
//rootElement.appendChild(globalStyles);
document.head.appendChild(globalStyles);

document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

