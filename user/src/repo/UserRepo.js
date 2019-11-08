/**
 *  @fileOverview car Write what's going on in the file here.
 *  @file         CarRepo Created at 12/25/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
import createUserSchema from '../model/User';
import { NO_DB_OBJECT } from '../config/constants';

const isMongoose = obj => typeof obj.model === 'function';

class UsersRepo {
	constructor({ app, mongoose } = {}) {
		if (!mongoose || !isMongoose(mongoose)) {
			throw new TypeError(NO_DB_OBJECT);
		}
		createUserSchema(mongoose)
			.then(user => {
				this.User = user;
			})
			.catch(error => {
				app.emit('db.error');
			});
	}

	get(req) {
		return this.User.findById(req.id, {password: 0, passwordVisible: 0});
	}

	list() {
		return this.User.find({}, {password: 0, passwordVisible: 0});
	}

	save(req) {
		const user = new this.User({ ...req });
		return user.save();
	}

	update(req) {
		return this.User.findOneAndUpdate(
			{ _id: req._id },
			{ ...req },
			{ new: true }
		);
	}

	delete(id) {
		return this.User.findOneAndRemove({ _id: id });
	}

	disconnect() {}
}

export default UsersRepo;
