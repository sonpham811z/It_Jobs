import { createTheme } from '@mui/material/styles';

const APP_BAR_HEIGHT = '60px';
const BOARD_BAR_HEIGHT = '40px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = '45px';
const COLUMN_FOOTER_HEIGHT = '50px'; // Sửa lại chính tả
// Create a theme instance.
const theme = createTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT, // Fix key không đồng bộ
    boardHeaderHeight: COLUMN_HEADER_HEIGHT,
    boardFooterHeight: COLUMN_FOOTER_HEIGHT
  },
  palette: { // Đưa palette ra ngoài colorSchemes
    mode: 'light', 
    primary: {
      main: '#D32F2F', // Đỏ
      second: '#fff'
    },
    secondary: {
      main: '#212121', // Đen
    },
    tertiary: {
      main: '#FFFFFF' // Trắng
    },
    text: {
      primary: '#FFFFFF', // Chữ trắng
      secondary: '#D32F2F' // Chữ đỏ khi focus
    },
    background: {
      default: '#212121' // Background đen
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '3px',
            height: '3px',
          },
          '*::-webkit-scrollbar-track': {
            margin: '2px' // Fix lỗi chính tả
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#e0dede',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#D32F2F', // Đổi màu đỏ khi hover
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Bo góc mềm hơn
          textTransform: 'none', // Không viết hoa chữ
          fontWeight: 'bold',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          fontSize: '0.87rem',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          fontSize: '0.87rem',
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: "text.primary"
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "text.secondary"
          },
          "& .MuiOutlinedInput-root": {
            color: "text.primary",
            "& fieldset": { borderColor: "text.primary" },
            "&:hover fieldset": { borderColor: "text.primary" },
            "&.Mui-focused fieldset": { borderColor: "text.secondary" } // Khi focus đổi sang màu đỏ
          }
        }
      }
    }
  },
});

export default theme;
