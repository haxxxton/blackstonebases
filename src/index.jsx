import './index.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<App />
	</ThemeProvider>,
);
