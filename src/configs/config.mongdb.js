'use strict';
//level 0

// const config = {
// 	app: {
// 		port: 3000
// 	},
// 	db: {
// 		host: 'localhost',
// 		port: 27017,
// 		name: 'db'
// 	}
// };

// // level 1
const dev = {
	app: {
		port: process.env.DEV_APP_PORT || 3052,
	},
	db: {
		host: process.env.PRO_DB_HOST || 'localhost',
		port: process.env.PRO_DB_PORT || 27017,
		name: process.env.DEV_DB_NAME || 'shopDev',
	},
};

const pro = {
	app: {
		port: process.env.PRO_APP_PORT || 3000
	},
	db: {
		host: process.env.PRO_DB_HOST || 'localhost',
		port: process.env.PRO_DB_PORT || 27017,
		name: process.env.PRO_DB_NAME || 'shopPro'
	},
};

// Cấu hình môi trường
const config = { dev, pro };

// Lấy giá trị môi trường hiện tại
const env = process.env.NODE_ENV || 'dev';

// // Xuất cấu hình tương ứng
module.exports = config[env]
