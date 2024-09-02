import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

// var cors = require('cors')

// const corsOptions ={
//   origin:'http://localhost:3000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }

// app.use(cors(corsOptions));

// window.location.reload()
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
