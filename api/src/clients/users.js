/**
 *  @fileOverview api Write what's going on in the file here.
 *  @file         users Created at 1/13/19 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */

import grpc, { loadPackageDefinition } from 'grpc';
import fs from 'fs';
import config from "../config/config";

export default () => {
	const path = require('path');
	const protoLoader = require('@grpc/proto-loader');
	const PROTO_PATH = path.resolve('.') + '/src/proto/Users.proto';
	const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
		keepCase: true,
		longs: String,
		enums: String,
		defaults: true,
		oneofs: true
	})

	const { UsersService } = loadPackageDefinition(packageDefinition).users;

	const options = {};

	return new UsersService(
		'localhost:50052',
		grpc.credentials.createSsl(
			fs.readFileSync(path.resolve('.') + `${config.path}cert/server.crt`),
			fs.readFileSync(path.resolve('.') + `${config.path}cert/server.key`),
			fs.readFileSync(path.resolve('.') + `${config.path}cert/server.crt`)
		),
		options
	);
};
