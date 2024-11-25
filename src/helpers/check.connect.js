'use strict'

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const SECONDS = 5000

//count connect
const countConnect = () => {
	const numConnection = mongoose.connections.length
	console.log(`Number of connection::${numConnection}`);
}

//check overload
const checkOverLoad = () => {
	setInterval(() => {
		const numConnection = mongoose.connections.length
		const numCOres = os.cpus().length;
		const memoryUsage = process.memoryUsage().rss
		// max chiu tai la 
		const maxConnections = numCOres * 5;
		//console.log(`Active connections:: ${numConnection}`);
		//console.log(`memory usage::${memoryUsage / 1024 / 1024}MB`);

		if (numConnection > maxConnections) {
			console.log(`Connecton overload`);
			//notife.send()
		}
	}, SECONDS)// monitor every 5 second
}
module.exports = {
	countConnect,
	checkOverLoad
}