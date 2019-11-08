/**
 *  @fileOverview car Write what's going on in the file here.
 *  @file         CarRepo Created at 12/25/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
import createCarSchema from '../model/Car';
import { NO_DB_OBJECT } from '../config/constants';
const isMongoose = obj => typeof obj.model === 'function';

class CarsRepo {
	constructor({ app, mongoose } = {}) {
		if (!mongoose || !isMongoose(mongoose)) {
			throw new TypeError(NO_DB_OBJECT);
		}
		createCarSchema(mongoose)
			.then(car => {
				this.Car = car;
			})
			.catch(error => {
				app.emit('db.error');
			});
	}

	get(req) {
		return this.Car.findById(req.id);
	}

	list() {
		return this.Car.find({});
	}

	save(req) {
		const car = new this.Car({ ...req });
		return car.save();
	}

	update(req) {
		return this.Car.findOneAndUpdate(
			{ _id: req._id },
			{ ...req },
			{ new: true }
		);
	}

	delete(id) {
		return this.Car.findOneAndRemove({ _id: id });
	}

	disconnect() {}
}

export default CarsRepo;
