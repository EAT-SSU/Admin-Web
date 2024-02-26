import { createTheme } from '@mui/material/styles';

// 테마 생성
const theme = createTheme({
    palette: {
        primary: {
            main: '#DF5757',
        },
        secondary: {
            main: '#E86C6C',
        },
        grey: {
            main: '#F0F0F0',
        },
        lightgrey: {
            main: '#E0E0E0',
        },
        white: {
            main: '#FFFFFF',
        },
    },
    typography: {
        button: {
            fontSize: '1rem',
            fontWeight: '700',
            borderRadius: '0.5rem',
            padding: '0.5rem 1rem',
        },
    }
});

export { theme };