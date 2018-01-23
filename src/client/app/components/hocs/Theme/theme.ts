import { createMuiTheme } from 'material-ui/styles';
import { purple } from 'material-ui/colors';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto,Arial,sans-serif',
  },
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

export default theme;
