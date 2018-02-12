import * as React from 'react';
import { getDisplayName } from 'utils';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from './theme';

/** App Wrapper Components */
interface IAppWrapperProps {
  children: JSX.Element;
}
const AppWrapper = (props: IAppWrapperProps) => props.children;

/** HOC that provide props.theme
 * for app theme on color palatte, typography adn etc
 */
function withTheme(BaseComponent: React.ComponentType) {
  class WithTheme extends React.Component<any, any> {
    static displayName: string;
    public render() {
      return (
        <MuiThemeProvider theme={theme}>
          <AppWrapper>
            <BaseComponent {...this.props} />
          </AppWrapper>
        </MuiThemeProvider>
      );
    }
  }
  WithTheme.displayName = `WithTheme(${getDisplayName(BaseComponent)})`;
  return WithTheme;
}

export default withTheme;
