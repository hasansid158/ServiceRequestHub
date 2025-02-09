import { createTheme } from '@mui/material/styles';

const colours = {
  primary: '#1C315E',
  secondary: '#E76F51',
  textWhite: '#FFFFFF',
  lightGrey: '#F9F9F9',
  background: '#e6eaf2',
  darkGrey: '#333333',
};

const theme = createTheme({
  spacing: 8,
  palette: {
    common: colours,
    primary: {
      main: colours.primary,
      contrastText: colours.textWhite,
      light: colours.textWhite,
    },
    secondary: {
      main: colours.secondary,
      contrastText: colours.textWhite,
      light: colours.textWhite,
    },
  },
  typography: {
    allVariants: {
      color: colours.darkGrey,
    },
    h1: {
      fontSize: '48px',
      fontWeight: '700',
      lineHeight: '56px',
    },
    h2: {
      fontSize: '40px',
      fontWeight: '600',
      lineHeight: '48px',
    },
    h3: {
      fontSize: '32px',
      fontWeight: '600',
      lineHeight: '40px',
    },
    h4: {
      fontSize: '24px',
      fontWeight: 500,
      lineHeight: '32px',
    },
    h5: {
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: '28px',
    },
    h6: {
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '24px',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1280,
      xl: 1550,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          textTransform: 'none',
          padding: '8px 16px',
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: colours.primary,
          color: colours.textWhite,
          '&:hover': {
            backgroundColor: '#FF765A',
          },
        },
        outlinedPrimary: {
          borderColor: colours.primary,
          color: colours.primary,
          '&:hover': {
            backgroundColor: colours.lightGrey,
          },
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          minWidth: '200px',
        },
      }
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          width: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          '&.Mui-selected': {
            backgroundColor: colours.primary,
            color: colours.textWhite,
            '&:hover': {
              backgroundColor: colours.primary,
            }
          },
          '&:hover': {
            backgroundColor: colours.secondary,
            color: colours.textWhite,
          },
        },
      }
    }
  },
});

export default theme;