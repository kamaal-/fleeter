/**
 *  @fileOverview car Write what's going on in the file here.
 *  @file         index Created at 12/26/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
import mongoose from 'mongoose';
import config from '../config/config';
import { APP_STATES } from '../config/constants';

export const connect = app => {
	const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : config.DB_HOST;
	mongoose.Promise = global.Promise;
	mongoose.set('useFindAndModify', false); // https://github.com/Automattic/mongoose/issues/6880
	app.once(APP_STATES.START, () => {
		mongoose.connect(
			DB_HOST,
			{ useNewUrlParser: true }
		);
		const db = mongoose.connection;
		db.once('open', () => {
			app.emit(APP_STATES.DB_CONNECTED, { db, mongoose });
		});

		db.on('error', error => {
			app.emit(APP_STATES.DB_ERROR, error);
		});
	});
};
