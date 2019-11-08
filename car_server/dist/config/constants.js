"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APP_STATES = exports.NO_DB_OBJECT = void 0;

/**
 *  @fileOverview car Write what's going on in the file here.
 *  @file         constants Created at 12/24/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
var NO_DB_OBJECT = 'Mongoose object is missing';
exports.NO_DB_OBJECT = NO_DB_OBJECT;
var APP_STATES = {
  START: 'APP_STARTED',
  DB_CONNECTED: 'DB_CONNECTED',
  DB_ERROR: 'DB_ERROR',
  REPO_CREATED: 'REPO_CREATED'
};
exports.APP_STATES = APP_STATES;