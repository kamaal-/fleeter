/**
 *  @fileOverview api Write what's going on in the file here.
 *  @file         cars Created at 12/27/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
import grpc, { loadPackageDefinition } from 'grpc'
import fs from 'fs'
import config from '../config/config';

export default () => {
	const path = require('path');
	const protoLoader = require('@grpc/proto-loader');
	const PROTO_PATH = path.resolve('.') + `${config.path}proto/Cars.proto`;
	const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
		keepCase: true,
		longs: String,
		enums: String,
		defaults: true,
		oneofs: true
	})

	const { CarsService } = loadPackageDefinition(packageDefinition).cars;

	const options = {};
	const CERT_NAME = process.env.CERT_NAME || `${config.path}cert/server`

	return new CarsService(
		config.carService,
		grpc.credentials.createSsl(
			fs.readFileSync(path.resolve('.') + `${CERT_NAME}.crt`),
			fs.readFileSync(path.resolve('.') + `${CERT_NAME}.key`),
			fs.readFileSync(path.resolve('.') + `${CERT_NAME}.crt`)
		),
		options
	)
};
