import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<BrowserRouter>
<App />
</BrowserRouter>
);
reportWebVitals();

// ReactDOM.render is no longer supported in React 18~~ 오류
// 버전차이라 구글링해서 오류고침