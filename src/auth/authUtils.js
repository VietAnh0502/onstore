// 'use strict'

// const JWT = require('jsonwebtoken')
// const createTokenPair = async (payload, publicKey, privateKey) => {
// 	try {
// 		// accessToken
// 		const accessToken = JWT.sign(payload, privateKey, {
// 			algorithm: 'RS256',
// 			expiresIn: '2 days'
// 		})

// 		const refreshToken = JWT.sign(payload, privateKey, {
// 			algorithm: 'RS256',
// 			expiresIn: '7 days'

// 		})
// 		JWT.verify(accessToken, publicKey, (err, decode) => {
// 			if (err) {
// 				console.error('error verify::', err)
// 			} else {
// 				console.log(`decode verify::`, decode);
// 			}
// 		})

// 		return { accessToken, refreshToken }
// 	} catch (error) {

// 	}
// }
// module.exports = createTokenPair

'use strict'

const JWT = require('jsonwebtoken');

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

module.exports = createTokenPair;
