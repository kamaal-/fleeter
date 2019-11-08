/**
 *  @fileOverview car Write what's going on in the file here.
 *  @file         index Created at 12/26/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
import grpc, { Server, ServerCredentials } from 'grpc';
import fs from 'fs';

const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = path.resolve('.') + '/src/proto/Cars.proto';
const credentials = ServerCredentials.createSsl(
	fs.readFileSync(path.resolve('.') + '/src/cert/cars_server.crt'),
	[
		{
			cert_chain: fs.readFileSync(
				path.resolve('.') + '/src/cert/cars_server.crt'
			),
			private_key: fs.readFileSync(
				path.resolve('.') + '/src/cert/cars_server.key'
			)
		}
	]
);

export default repo => {
	protoLoader.load(PROTO_PATH).then(resp => {
		const server = new Server();
		const assignServices = () => {
			server.addService(resp['cars.CarsService'], {
				list: (req, callback) => {
					repo.list()
						.then(response => {
							console.log(response);
							callback(null, { cars: response });
						})
						.catch(error => {
							callback({ message: 'Error' }, null);
						});
				},

				insert: (data, callback) => {
					const car = data.request;
					repo.save(car)
						.then(response => {
							callback(null, {
								type: 'Car Saved',
								message: 'Success',
								car: response
							});
						})
						.catch(error => {
							console.log(car);
							callback({ message: 'Error' }, null);
						});
				},

				get: (data, callback) => {
					const car = data.request;
					repo.get(car)
						.then(response => {
							callback(null, response);
						})
						.catch(error => {
							console.log(error);
							callback({ message: 'Error' }, null);
						});
				},

				update: (data, callback) => {
					const car = data.request;
					console.log(data);
					repo.update(car)
						.then(response => {
							callback(null, {
								type: 'Car Updated',
								message: 'Success',
								car: response
							});
						})
						.catch(error => {
							console.log(error);
							callback({ message: 'Error' }, null);
						});
				},

				remove: (data, callback) => {
					const car = data.request;
					repo.delete(car.id)
						.then(response => {
							callback(null, {
								type: 'Car Deleted',
								message: 'Success',
								car: response
							});
						})
						.catch(error => {
							console.log(error);
							callback({ message: 'Error' }, null);
						});
				}
			});
			return server;
		};

		const routeServer = assignServices();
		routeServer.bind('0.0.0.0:50051', credentials);
		routeServer.start();
	});
};
