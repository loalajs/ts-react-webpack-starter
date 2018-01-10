import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from 'routers//Root';

/** Polyfills
 * es6-promise polyfill provide Promise usage for IE browser
 * Reference: https://github.com/stefanpenner/es6-promise#auto-polyfill
 */
import 'es6-promise/auto';

/** Base style that contains normalize-scss */
import './styles';

ReactDOM.render(
    <main>
      <Root />
    </main>
    ,
    document.getElementById('app'),
);
