'use strict'

const StatusCode = {
	FORBIDDEN: 403,
	CONFLICT: 409,
	BAD_REQUEST: 400, // Thêm mã trạng thái 400 cho Bad Request
	NOT_FOUND: 404, // Thêm mã trạng thái 404 cho Not Found
	UNAUTHORIZED: 401 // Thêm mã trạng thái 401 cho Unauthorized
}

const ReasonStatusCode = {
	FORBIDDEN: 'Forbidden error',
	CONFLICT: 'Conflict error',
	BAD_REQUEST: 'Bad request error', // Cập nhật Reason cho Bad Request
	NOT_FOUND: 'Not found error', // Cập nhật Reason cho Not Found
	UNAUTHORIZED: 'Unauthorized error' // Cập nhật Reason cho Unauthorized
}

const { ReasonPhrases } = require('../utils/httpStatusCode'); // Sửa lỗi đánh máy ReasonPhares thành ReasonPhrases

class ErrorResponse extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

class ConflictRequestError extends ErrorResponse {
	constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) { // Cập nhật mã trạng thái là CONFLICT
		super(message, statusCode);
	}
}

class BadRequestError extends ErrorResponse {
	constructor(message = ReasonStatusCode.BAD_REQUEST, statusCode = StatusCode.BAD_REQUEST) { // Cập nhật mã trạng thái là BAD_REQUEST
		super(message, statusCode);
	}
}

class AuthFailureError extends ErrorResponse {
	constructor(message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCode.UNAUTHORIZED) {
		super(message, statusCode);
	}
}

class NotFoundError extends ErrorResponse {
	constructor(message = ReasonPhrases.NOT_FOUND, statusCode = StatusCode.NOT_FOUND) { // Sửa lỗi ReasonPhares thành ReasonPhrases
		super(message, statusCode);
	}
}

module.exports = {
	ConflictRequestError,
	BadRequestError,
	AuthFailureError,
	NotFoundError
}
