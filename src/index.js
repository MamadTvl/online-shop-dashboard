import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import rtl from "jss-rtl";
// import {create} from 'jss';
// import {jssPreset, StylesProvider} from "@material-ui/core/styles";

// const jss = create({plugins: [...jssPreset().plugins, rtl()]});
//todo : checkOut jss in new branch
ReactDOM.render(
    // <StylesProvider jss={jss}>
    <React.StrictMode>
        <App/>
    </React.StrictMode>
    ,
    document.getElementById('root')
);
