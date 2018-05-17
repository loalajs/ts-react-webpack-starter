import { default as ApplicationBootstrap } from './bootstrap';

class ApplicationSetup {
  constructor() {
    new ApplicationBootstrap();
  }
}

new ApplicationSetup();
