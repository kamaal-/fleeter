/**
 *  @fileOverview api Write what's going on in the file here.
 *  @file         index Created at 12/27/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
import createCarClient from './cars'
import createUserClient from './users'

const ClientsFactory = {

	Client({app, type}) {

		if(!app){
			throw new Error('App not provided')
		}

		if (!type){
			app.emit('error', new TypeError('no type provided'))
			return;
		}

		return Object.create(this._bundle[type]);
	},

	_bundle : {
		car : createCarClient(),
		user: createUserClient()
	}

}

export default ClientsFactory
