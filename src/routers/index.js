'use strict'

const express = require('express')
const { apiKey, permission } = require('../auth/checkAuth')
const router = express.Router()

//check api
router.use(apiKey)

//check permission
router.use(permission('0000'))

router.use('/v1/api', require('./accsess'))
// router.get('/', (req, res, next) => {
// 	return res.status(200).json({
// 		message: "Welcome my channel"
// 	})
// })




module.exports = router