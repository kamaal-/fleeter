/**
 *  @fileOverview api Write what's going on in the file here.
 *  @file         App Created at 12/27/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */

import { EventEmitter } from 'events';
import { APP_STATES } from './config/constants';
import {CLIENTS} from './config/constants'
import ClientsFactory from './clients/'
import startServer from './server'

export default class App extends EventEmitter {
	static instance;
	constructor() {
		super();
		if (this.instance) {
			return instance;
		}
		this._connectClients()
		this._startServer()
		this.instance = this;
	}

	init() {
		this.emit(APP_STATES.START);
	}

	_connectClients(){

		this.once(APP_STATES.START, () => {
			const clients = {}
			clients[CLIENTS.CAR] = ClientsFactory.Client({type:CLIENTS.CAR, app: this})
			clients[CLIENTS.USER] = ClientsFactory.Client({type: CLIENTS.USER, app: this})
			this.clients = clients
			this.emit(APP_STATES.CLIENTS_CREATED, clients)
		})
	}

	_startServer(){
		this.once(APP_STATES.CLIENTS_CREATED, (clients) => {
			startServer({port: 5003, clients})
		})
	}
}
