/**
 *  @fileOverview car Write what's going on in the file here.
 *  @file         Car Created at 12/24/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */

import { Schema } from 'mongoose';
import { NO_DB_OBJECT } from '../config/constants';

const CarSchema = new Schema({
	model: { type: String, required: 'Required', min: 2 },
	make: { type: String, required: 'Required', min: 2 },
	year: { type: Number, required: 'Required' },
	doors: { type: Number },
	createdAt: { type: Date, default: new Date() },
	totalRun: { type: Number, required: 'Required' },
	currentRun: { type: Number },
	fuel: { type: String }
});

export default mongoose =>
	new Promise((resolve, reject) => {
		if (!mongoose) {
			reject(new TypeError(NO_DB_OBJECT));
		} else {
			resolve(mongoose.model('Car', CarSchema));
		}
	});
