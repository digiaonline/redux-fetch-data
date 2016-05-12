import 'babel-polyfill';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiJsx from 'chai-jsx';
import sinonChai from 'sinon-chai';
import { jsdom } from 'jsdom';

chai.use(chaiEnzyme());
chai.use(chaiJsx);
chai.use(sinonChai);

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
