

'use strict'

const JWT = require('jsonwebtoken');
const { asyncHandler } = require('../helpers/asyncHandler');
const { AuthFailureError, NotFoundError } = require('../core/error.response');
const { findByUserId } = require('../services/keyToken.service');

const HEADER = {
	API_KEY: 'x-api-key',
	CLIENT_ID: 'x-client-id',
	AUTHORIZATION: 'authorization'
}

const createTokenPair = async (payload, publicKey, privateKey) => {
	try {
		// Tạo accessToken
		const accessToken = JWT.sign(payload, publicKey, {
			//algorithm: 'RS256',
			expiresIn: '2 days'
		});

		// Tạo refreshToken
		const refreshToken = JWT.sign(payload, privateKey, {
			//algorithm: 'RS256',
			expiresIn: '7 days'
		});

		// Debugging - kiểm tra token đã được xác minh
		JWT.verify(accessToken, publicKey, (err, decode) => {
			if (err) {
				console.error('error verify::', err);
			} else {
				console.log('decode verify::', decode);
			}
		})

		return { accessToken, refreshToken };
	} catch (error) {
		console.error('Error creating token pair:', error);
		return null;
	}
};

const authentication = asyncHandler(async (req, res, next) => {
	//check userId 
	//get accsessToken
	//verifyToken
	//check user in bds
	//check keyStore với userId

	const userId = req.headers[HEADER.CLIENT_ID]
	if (!userId) throw new AuthFailureError('Invalid Request')

	const keyStore = await findByUserId(userId)
	if (!keyStore) throw new NotFoundError('Not found keyStore')

	const accessToken = req.headers[HEADER.AUTHORIZATION]
	if (!accessToken) throw new NotFoundError('Ivalid request')

	try {
		const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
		if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid Userid')

		req.keyStore = keyStore
		return next()
	} catch (error) {
		throw error
	}
})

module.exports = {
	createTokenPair,
	authentication
}