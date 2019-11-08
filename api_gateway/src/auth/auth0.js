/**
 *  @fileOverview api Write what's going on in the file here.
 *  @file         auth0 Created at 1/21/19 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
import jwt from 'express-jwt'
import rsaValidation from 'auth0-api-jwt-rsa-validation'
//import jwtAuthz from 'express-jwt-authz'
import jwksRsa from'jwks-rsa'
export const jwtMiddleware = () => {
	return jwt({
		// Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
		secret: jwksRsa.expressJwtSecret({
			cache: true,
			rateLimit: true,
			jwksRequestsPerMinute: 5,
			jwksUri: `https://kamaal.auth0.com/.well-known/jwks.json`
		}),
		// Validate the audience and the issuer.
		audience: 'https://kamaal.auth0.com/api/v2/',
		issuer: `https://kamaal.auth0.com/`,
		algorithms: ['RS256']
	})
}

export const guard = (req, res, next) => {
	next()
}
