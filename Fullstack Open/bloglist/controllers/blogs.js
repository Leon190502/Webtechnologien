const express = require("express");
const { Blog } = require("../models/blogs");

const blogsRouter = express.Router();

blogsRouter.get("/", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

blogsRouter.get('/:id', (request, response) => {
	Blog.findById(request.params.id)
		.then(blog => {
			if (blog) {
				response.json(blog)
			} else {
				response.status(404).end()
			}
		})
})

blogsRouter.post("/", (request, response) => {
	let blog = new Blog(request.body);
	if (!blog.likes) {
		blog.likes = 0
	}

	blog.save().then((result) => {
		response.status(201).json(result);
	});
});

exports.blogsRouter = blogsRouter;
