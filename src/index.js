import './index.css';

import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import theme from './theme';

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<App />
	</ThemeProvider>,
	document.getElementById('root'),
);
