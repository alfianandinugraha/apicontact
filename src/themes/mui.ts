import { createTheme } from '@mui/material'

const muiTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    allVariants: {
      color: 'white',
    },
  },
  palette: {
    primary: {
      main: '#537EC5',
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          cursor: 'pointer',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#1F232A',
          color: 'white',
        },
      },
    },
  },
})

export default muiTheme
