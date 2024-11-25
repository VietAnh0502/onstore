'use strict'

// lưu trữ token
const { model, Schema, Types } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model

const DOCUMENT_NAME = 'Apikey';
const COLLECTION_NAME = 'Apikeys'

const apiKeySchema = new Schema({
	key: {
		type: String,
		required: true,
		unique: true,

	},
	status: {
		type: Boolean,
		default: true,

	},
	permissions: {
		type: [String],
		required: true,
		//key
		enum: ['0000', '1111', '2222']
	},

}, {
	timestamps: true,
	collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, apiKeySchema);