import { createTheme } from '@mui/material';

export default createTheme({
	palette: {
		mode: 'dark',
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
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				'@global': {
					'*, *::before, *::after': {
						boxSizing: 'border-box',
					},
				},
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					rotate: '180deg',
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					margin: '20px 0',
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
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
	},
});
