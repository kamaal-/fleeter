/**
 *  @fileOverview api Write what's going on in the file here.
 *  @file         App Created at 12/27/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */

import { EventEmitter } from 'events';
import { APP_STATES } from './config/constants';
import startServer from './server'

export default class App extends EventEmitter {
	static instance;
	constructor() {
		super();
		if (this.instance) {
			return instance;
		}

		this._startServer()
		this.instance = this;
	}

	init() {
		this.emit(APP_STATES.START);
	}

	_startServer(){
		this.once(APP_STATES.START, () => {
			startServer({port: process.env.PORT || 3000})
		})
	}
}
