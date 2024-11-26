'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require("./keyToken.service")
const createTokenPair = require("../auth/authUtils")
const { getInfoData } = require('../utils')
const { BadRequestError, ConflictRequestError, AuthFailureError } = require("../core/error.response")
const { findByEmail } = require("./shop.service")

const RoleShop = {
	SHOP: 'shop',
	WRITER: 'WRITER',
	EDITOR: 'EDITOR',
	ADMIN: 'ADMIN'
}
class AccessService {

	//check email, password
	//tạo accsess token refeshtoken
	static login = async ({ email, password, refeshToken = null }) => {
		const foundShop = await findByEmail({ email })
		if (!foundShop) throw new BadRequestError('Shop not registered')

		const match = bcrypt.compare(password, foundShop.password)
		if (!match) throw new AuthFailureError('Authentication error')

		//3 created privateKey, publicKey
		const privateKey = crypto.randomBytes(64).toString('hex')
		const publicKey = crypto.randomBytes(64).toString('hex')
		//4 generate tokens
		const { _id: userId } = foundShop
		const tokens = await createTokenPair({ userId, email }, publicKey, privateKey)

		await KeyTokenService.createKeyToken({
			refreshToken: tokens.refreshToken,
			privateKey, publicKey, userId

		})
		return {
			shop: getInfoData({ fields: ['_id', 'name', 'email'], object: foundShop }),
			tokens
		}

	}
	static signUp = async ({ name, email, password }) => {

		//try {
		// check email
		const hodelShop = await shopModel.findOne({ email }).lean()
		if (hodelShop) {
			throw new BadRequestError('Error: Shop already registerd!')
		}
		const passwordHash = await bcrypt.hash(password, 10)

		const newShop = await shopModel.create({
			name, email, password: passwordHash, roles: [RoleShop.SHOP]
		})

		if (newShop) {
			const privateKey = crypto.randomBytes(64).toString('hex')
			const publicKey = crypto.randomBytes(64).toString('hex')

			console.log({ privateKey, publicKey }) //save collection KeyStore

			const keyStore = await KeyTokenService.createKeyToken({
				userId: newShop._id,
				publicKey
			})

			if (!keyStore) {
				throw new BadRequestError('Error: keyStore Error')
				// return {
				// 	code: 'xxxx',
				// 	message: 'keyStore error'
				// }
			}


			//tạo token pair
			const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)

			console.log(`Created Token Success:`, tokens);

			return {
				code: 201,
				metadata: {

					shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
					tokens
				}
			}

		}

		return {
			code: 200,
			metadata: null
		}
		// } catch (error) {
		// 	return {
		// 		code: 'xxx',
		// 		message: error.message,
		// 		status: 'error'
		// 	}
		// }
	}
}

module.exports = AccessService