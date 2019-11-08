/**
 *  @fileOverview car Write what's going on in the file here.
 *  @file         CarRepo.test Created at 12/25/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
import test from 'ava';
import Cars from '../src/repo/CarRepo';
import mongoose from 'mongoose';
import describe from './describe';
import { NO_DB_OBJECT } from '../src/config/constants';
import sinon from 'sinon';
import { EventEmitter } from 'events';

const app = new EventEmitter();

require('sinon-mongoose');

describe('TEST SUIT :: CAR REPO', () => {
	test('It should throw error', t => {
		const error = t.throws(() => {
			new Cars();
		});
		t.is(error.message, NO_DB_OBJECT);
	});

	test('It should save', async t => {
		const cars = new Cars({ app, mongoose });
		sinon.stub(cars, 'save').resolves('Saved');
		const message = await cars.save();
		t.is(message, 'Saved');
	});

	test('It should delete', async t => {
		const cars = new Cars({ app, mongoose });
		sinon.stub(cars, 'delete').resolves('Deleted');
		const message = await cars.delete();
		t.is(message, 'Deleted');
	});

	test('It should update', async t => {
		const cars = new Cars({ app, mongoose });
		sinon.stub(cars, 'update').resolves('Updated');
		const message = await cars.update();
		t.is(message, 'Updated');
	});

	test('It should LIST', async t => {
		const cars = new Cars({ app, mongoose });
		sinon.stub(cars, 'list').resolves([]);
		const message = await cars.list();
		t.deepEqual(message, []);
	});

	test('It should get one', async t => {
		const cars = new Cars({ app, mongoose });
		sinon.stub(cars, 'get').resolves({});
		const message = await cars.get();
		t.deepEqual(message, {});
	});
});
