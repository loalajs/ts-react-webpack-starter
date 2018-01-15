import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from 'routers//Root';
import { importPromisePolyfill } from 'config//polyfills';
import { swRegister } from 'config//swRegister';

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

/** Register SW */
swRegister();
