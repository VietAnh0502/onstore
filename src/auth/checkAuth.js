'use strict'

const { findById } = require("../services/apikey.service")

const HEADER = {
	API_KEY: 'x-api-key',
	AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
	try {
		// Lấy API key từ headers
		const key = req.headers[HEADER.API_KEY]?.toString()

		// Nếu không có key, trả về lỗi 403
		if (!key) {
			return res.status(403).json({
				message: 'API Key is missing, Forbidden Error'
			})
		}

		// Kiểm tra key trong database
		const objKey = await findById(key)
		if (!objKey) {
			return res.status(403).json({
				message: 'Invalid or inactive API Key, Forbidden Error'
			})
		}

		// Gán objKey vào request để sử dụng ở bước tiếp theo
		req.objKey = objKey
		return next()
	} catch (error) {
		// Log lỗi và trả về 500 nếu có lỗi
		console.error('API Key middleware error:', error);
		return res.status(500).json({
			message: 'Internal Server Error'
		});
	}
}

const permission = (permission) => {
	return (req, res, next) => {
		if (!req.objKey.permissions) {
			return res.status(403).json({
				message: 'permission denied'
			})
		}
		// ktra có hợp lệ hay ko

		console.log(`permissions::`, req.objKey.permissions)
		const validPermission = req.objKey.permissions.includes(permission)
		if (!validPermission) {
			return res.status(403).json({
				message: 'permission denied'
			})
		}
		return next()
	}
}

const asyncHandler = fn => {
	return (req, res, next) => {
		fn(req, res, next).catch(next)
	}
}

module.exports = {
	apiKey, permission, asyncHandler
}
