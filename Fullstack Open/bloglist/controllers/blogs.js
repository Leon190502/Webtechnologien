const express = require("express");
const { Blog } = require("../models/blogs");
const { User } = require("../models/user")

const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate(
		'user', { 'username': 1, 'name': 1 }
	)
	response.json(blogs.map(b => b.toJSON()))
});

blogsRouter.get('/:id', async (request, response) => {
	await Blog.findById(request.params.id).populate(
		'user', { 'username': 1, 'name': 1 }
	)
		.then(blog => {
			if (blog) {
				response.json(blog)
			} else {
				response.status(404).end()
			}
		})
})

blogsRouter.post("/", async (request, response) => {
	const body = request.body
	const user = await User.findById(body.userId)



	const blog = new Blog({
		"title": body.title,
		"author": body.author,
		"url": body.url,
		"likes": body.likes,
		"user": user.id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
});

//Update a blog
blogsRouter.put('/:id', (request, response) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const updateBlog = Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

	if (!updateBlog) {
		return response.status(404).send('The block doesnt exist')
	}
	response.status(204).send(updateBlog)
})


// Delete a blog post by ID
blogsRouter.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const deletedBlog = await Blog.findByIdAndRemove(id);

	if (!deletedBlog) {
		return res.status(404).send('The blog with the given ID was not found');
	}
	res.status(204).send(deletedBlog);
});

exports.blogsRouter = blogsRouter;
