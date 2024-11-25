// lưu lại id user, refesh token
'use strict'

const { Schema, model, Collection } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'

// Declare the Schema of the Mongo model
var keyTokenSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Shop',

	},
	privateKey: {
		type: String,
		required: true,
	},
	publicKey: {
		type: String,
		required: true,

	},
	refreshToken: {
		type: Array,
		default: [],

	}

}, {
	collection: COLLECTION_NAME,  // sửa 'Collection' thành chữ thường 'collection'
	timestamps: true
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);