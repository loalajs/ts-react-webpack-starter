import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from 'routers//Root';
import { importPromisePolyfill } from 'config//polyfills';

/** Conditionally add polyfills */
importPromisePolyfill();

/** Base style that contains normalize-scss */
import './styles.critical';

ReactDOM.render(
    <main>
      <Root />
    </main>
    ,
    document.getElementById('app'),
);
