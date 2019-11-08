"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cars = _interopRequireDefault(require("./cars"));

var _users = _interopRequireDefault(require("./users"));

/**
 *  @fileOverview api Write what's going on in the file here.
 *  @file         index Created at 12/27/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
var ClientsFactory = {
  Client: function Client(_ref) {
    var app = _ref.app,
        type = _ref.type;

    if (!app) {
      throw new Error('App not provided');
    }

    if (!type) {
      app.emit('error', new TypeError('no type provided'));
      return;
    }

    return Object.create(this._bundle[type]);
  },
  _bundle: {
    car: (0, _cars.default)(),
    user: (0, _users.default)()
  }
};
var _default = ClientsFactory;
exports.default = _default;