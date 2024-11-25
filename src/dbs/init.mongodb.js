'use strict'

const mongoose = require('mongoose');
const { db: { host, name, port } } = require('../configs/config.mongdb')
//const config = require("../configs/config.mongdb");

//console.log(config);
// Chuỗi kết nối MongoDB
const connectString = `mongodb://${host}:${port}/${name}`;
console.log(connectString);
const { countConnect } = require('../helpers/check.connect')
class Database {
	constructor() {
		this.connect(); // Kết nối MongoDB khi khởi tạo
	}

	// Phương thức kết nối MongoDB
	connect(type = 'mongodb') {
		// Kích hoạt chế độ debug trong môi trường dev
		if (1 === 1) {
			mongoose.set('debug', true);
			mongoose.set('debug', { color: true });
		}

		// Thực hiện kết nối MongoDB
		mongoose.connect(connectString, {

			useNewUrlParser: true, // Khuyến nghị dùng
			useUnifiedTopology: true, // Khuyến nghị dùng
		})
			.then(() => console.log('Connected MongoDB Success Professional', countConnect()))
			.catch((err) => console.error('Error:', err));
	}

	// Singleton pattern để đảm bảo chỉ có một instance
	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}
}

// Tạo instance MongoDB
const instanceMongodb = Database.getInstance();

// Xuất module để sử dụng trong các file khác
module.exports = instanceMongodb;
