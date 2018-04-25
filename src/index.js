import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    palette: {
        textColor: Colors.darkBlack,
        primary1Color: Colors.white,
        primary2Color: Colors.indigo700,
        accent1Color: Colors.redA200,
        pickerHeaderColor: Colors.darkBlack,
        alternateTextColor: Colors.darkBlack
    },
    appBar: {
        height: 60,
    },
});

ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <App/>
        </MuiThemeProvider>
    </BrowserRouter>
    , document.getElementById('root'));

registerServiceWorker();
