import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#1c2955',
		},
		secondary: {
			main: '#1796a5',
		},
	},
	typography: {
		h1: {
			fontFamily: '"ITC Machine W03 Medium", serif',
		},
		h2: {
			fontFamily: '"ITC Machine W03 Medium", serif',
		},
		h3: {
			fontFamily: '"ITC Machine W03 Medium", serif',
		},
		h4: {
			fontFamily: '"ITC Machine W03 Medium", serif',
		},
		h5: {
			fontFamily: '"ITC Machine W03 Medium", serif',
		},
		h6: {
			fontFamily: '"ITC Machine W03 Medium", serif',
		},
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'*, *::before, *::after': {
					boxSizing: 'border-box',
				},
			},
		},
		MuiDivider: {
			root: {
				margin: [[20, 0]],
			},
		},
		MuiTypography: {
			h1: {
				position: 'relative',
			},
			h2: {
				position: 'relative',
			},
			h3: {
				position: 'relative',
			},
			h4: {
				position: 'relative',
			},
			h5: {
				position: 'relative',
			},
			h6: {
				position: 'relative',
			},
		},
	},
});
