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
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#537EC5',
        },
      },
    },
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
          borderRadius: '8px 8px 0 0',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
})

export default muiTheme
