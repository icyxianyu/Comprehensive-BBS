import React from 'react';
import App from './App'
import { createRoot } from 'react-dom/client';
import {HashRouter as Router} from "react-router-dom"
import { CookiesProvider } from 'react-cookie';
import "./assets/music/index.css"
const container = document.getElementById("root");
const root=createRoot(container);

root.render(
<Router>
        < CookiesProvider >
        <App/>
        </CookiesProvider>
</Router>)
