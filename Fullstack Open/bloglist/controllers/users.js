const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const { User } = require('../models/user')

const usersRouter = express.Router()

usersRouter.get('/', async (request, response) => {

	const users = await User.find({}).populate(
		'blogs', { 'url': 1, 'title': 1, 'author': 1 }
	)
	response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
	const body = request.body
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		"username": body.username,
		"name": body.name,
		passwordHash
	})

	const savedUser = await user.save()
	response.json(savedUser)
})

exports.usersRouter = usersRouter;