
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    // fontFamily: "'Work Sans', sans-serif",
  },
  components: {
    MuiTypography:{
      styleOverrides: {
        root: {
          fontFamily: "ChakraPetch",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: "#242424",
          color: "#fff",
          fontFamily: "ChakraPetch",
          borderColor: "#3a3a3a",
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          backgroundColor: "#242424",
          color: "#fff",
          fontFamily: "ChakraPetch",
          borderColor: "#3a3a3a",
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#fff", 
          fontSize: "24px",
        },
      },
    },
    MuiTablePagination:{
      styleOverrides: {
        root: {
          color: "#fff", 
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#fff", // Белый цвет стрелочки
        },
      },
    },
    MuiDialog:{
      styleOverrides: {
        paper: {
          backgroundColor: "#242424",
          color: "#fff",
          fontFamily: "Chakra Petch, sans-serif",
          border: "1px solid #3a3a3a",
        },

      },
    },
    MuiToolbar:{
      styleOverrides: {
        root: {
          backgroundColor: "#242424",
        },
      },
    },
    
    MuiTextField: {
      styleOverrides: {
        root: {
          
          '& .MuiFilledInput-root': {
            backgroundColor: '#333',
            color: '#fff',
            fontFamily: 'Chakra Petch, sans-serif',
            '&:hover, &.Mui-focused': {
              backgroundColor: '#444',
            },
            '&:before, &:after': {
              borderBottomColor: '#555',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#aaa',
            fontFamily: 'Chakra Petch, sans-serif',
            '&.Mui-focused': {
              color: '#fff',
            },
          },
        },
      },
    },
  },
});

export default theme;
