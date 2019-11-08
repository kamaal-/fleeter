/**
 *  @fileOverview car Write what's going on in the file here.
 *  @file         Car.test Created at 12/24/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
import test from 'ava';
import createCarSchema from '../src/model/Car';
import mongoose from 'mongoose';
import describe from './describe';
import { NO_DB_OBJECT } from '../src/config/constants';
import sinon from 'sinon';
require('sinon-mongoose');

describe('TEST SUIT :: CAR MODEL', async () => {
	let Car = null;
	test.before(async () => {
		Car = await createCarSchema(mongoose);
	});
	test('It should throw error', async t => {
		const error = await t.throwsAsync(createCarSchema());
		t.is(error.message, NO_DB_OBJECT);
	});

	test('It should throw validation error for year', async t => {
		//const Car = await createCarSchema(mongoose)
		const CarMock = sinon.mock(
			new Car({ model: 'Yaris', make: 'Toyota', totalRun: '12300' })
		);
		const car = CarMock.object;
		const error = await t.throwsAsync(car.save());
		t.is(error.message, 'Car validation failed: year: Required');
	});

	test('It should throw validation error for model', async t => {
		//const Car = await createCarSchema(mongoose)
		const CarMock = sinon.mock(
			new Car({ year: 2015, make: 'Toyota', totalRun: '12300' })
		);
		const car = CarMock.object;
		const error = await t.throwsAsync(car.save());
		t.is(error.message, 'Car validation failed: model: Required');
	});

	test('It should throw validation error for make', async t => {
		//const Car = await createCarSchema(mongoose)
		const CarMock = sinon.mock(
			new Car({ year: 2015, model: 'Yaris', totalRun: '12300' })
		);
		const car = CarMock.object;
		const error = await t.throwsAsync(car.save());

		t.is(error.message, 'Car validation failed: make: Required');
	});

	test('It should save', async t => {
		const CarMock = sinon.mock(
			new Car({ make: 'Toyota', model: 'Yaris', totalRun: '12300' })
		);

		CarMock.expects('save')
			.chain('exec')
			.withArgs()
			.resolves('Saved');
		const car = CarMock.object;
		const message = await car.save();
		t.is(message, 'Saved');
	});
});
