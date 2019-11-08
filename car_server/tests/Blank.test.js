/**
 *  @fileOverview car Write what's going on in the file here.
 *  @file         Blank.test Created at 12/25/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
import test from 'ava';
import describe from './describe';
import sinon from 'sinon';
require('sinon-mongoose');

class PubSub {
	subscribe(message, cb) {
		this.cb = cb;
		this.type = message;
	}

	publish(message) {
		if (this.type === message && this.cb) {
			this.cb();
		}
	}

	reset() {
		this.cb = null;
	}
}

describe('TEST SUIT :: BLANK MODEL', async () => {
	test('It should throw error', async t => {
		const error = await t.throwsAsync(() =>
			Promise.reject(new TypeError(':'))
		);
		t.is(error.message, ':');
	});

	test('Spy', t => {
		const pubSub = new PubSub();
		const cb = sinon.spy();
		pubSub.subscribe('hello', cb);
		pubSub.publish('hello');
		t.is(cb.called, true);
	});
});
