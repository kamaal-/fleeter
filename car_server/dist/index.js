"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _App = _interopRequireDefault(require("./App"));

var _db = require("./db");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _server = _interopRequireDefault(require("./server"));

var _constants = require("./config/constants");

/**
 *  @fileOverview car entry point to app.
 *  @file         index Created at 12/24/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
_dotenv.default.config();

var app = new _App.default();
app.once(_constants.APP_STATES.REPO_CREATED, function (repo) {
  (0, _server.default)(repo);
});
(0, _db.connect)(app); // start the app

app.init();