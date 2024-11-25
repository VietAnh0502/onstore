const app = require("./src/app");

const PORT = process.env.PORT || 3056

const server = app.listen(PORT, () => {
	console.log(`WSV eCommerce start with ${PORT}`);
});

//process là phương thức truy tìm
// process.on('SIGINT', () => {
// 	server.close(() => console.log("Exit server"))
// })