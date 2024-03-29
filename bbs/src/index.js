import React from 'react';
import App from './App'
import { createRoot } from 'react-dom/client';
import {HashRouter as Router ,BrowserRouter as Router1} from "react-router-dom"
import { CookiesProvider } from 'react-cookie';
import "./assets/music/index.css"
import 'animate.css';
import socket from "#/utils/socket.js"
socket.connect();
const container = document.getElementById("root");
const root=createRoot(container);

root.render(
<Router>
        < CookiesProvider >
        <App/>
        </CookiesProvider>
</Router>)
