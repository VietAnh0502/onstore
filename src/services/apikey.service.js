'use strict'

const apikeyModel = require("../models/apikey.model")
const crypto = require('crypto')
const findById = async (key) => {
	// const newKey = await apikeyModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000'] }) // 0000 thỏa mãn api
	// console.log(newKey)
	const objKey = await apikeyModel.findOne({ key, status: true }).lean()
	console.log(objKey)
	return objKey
}

module.exports = {
	findById
}