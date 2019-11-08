/**
 *  @fileOverview car Write what's going on in the file here.
 *  @file         App Created at 12/26/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */

import { EventEmitter } from 'events';
import { APP_STATES } from './config/constants';
import Repo from './repo/UserRepo';
import {logger} from './utils'

export default class App extends EventEmitter {
	static instance;
	constructor() {
		super();
		if (this.instance) {
			return instance;
		}
		this._hookDb();
		this.instance = this;
	}

	_hookDb() {
		this.once(APP_STATES.DB_CONNECTED, ({ mongoose }) => {
			this._connectToRepo(mongoose);
		});
		this.once(APP_STATES.DB_ERROR, error => {
			console.log(error);
		});
	}

	_connectToRepo = mongoose => {
		this.repo = new Repo({ app: this, mongoose });
		this.emit(APP_STATES.REPO_CREATED, this.repo);
	};

	init() {
		this.emit(APP_STATES.START);
	}
}
