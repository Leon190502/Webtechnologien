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

	if (!blog.title || !blog.url) {
		response.status(400).json({ "error": "no url or title" })
	} else {
		blog.save().then((result) => {
			response.status(201).json(result);
		});
	}
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
		return response.status(404).send('The blod doesnt exist')
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
