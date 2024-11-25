'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require("./keyToken.service")
const createTokenPair = require("../auth/authUtils")
const { getInfoData } = require('../utils')
const { BadRequestError, ConflictRequestError } = require("../core/error.response")

const RoleShop = {
	SHOP: 'shop',
	WRITER: 'WRITER',
	EDITOR: 'EDITOR',
	ADMIN: 'ADMIN'
}
class AccessService {
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