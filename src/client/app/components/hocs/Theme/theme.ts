import { createMuiTheme } from 'material-ui/styles';
import { indigo, pink } from 'material-ui/colors';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto,Arial,sans-serif',
  },
  palette: {
    primary: indigo, // Purple and green play nicely together.
    secondary: pink, // This is just green.A700 as hex.
  },
});

export default theme;
