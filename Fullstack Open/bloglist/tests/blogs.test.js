const mongoose = require("mongoose");
const { ObjectId } = require('mongodb').ObjectId;
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

/*test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/)
		.expect((res) => {
			console.log(typeof res.body, res.body);
			expect(res.body).toHaveLength(1);
		});
});*/


/*const createNonExistingObjectId = () => {
	// Get the current time as a hexadecimal string
	const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');

	// Generate a random 12-byte buffer
	const randomBytes = Buffer.from([...Array(12)].map(() => Math.floor(Math.random() * 256)));

	// Concatenate the timestamp and random bytes to create a 24-byte buffer
	const objectIdBuffer = Buffer.concat([Buffer.from(timestamp, 'hex'), randomBytes]);

	// Convert the buffer to a hexadecimal string and create a new ObjectId instance
	return new ObjectId(objectIdBuffer.toString());
};*/

var mongoObjectId = function () {
	var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
	return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
		return (Math.random() * 16 | 0).toString(16);
	}).toLowerCase();
};

describe('allgemein', () => {
	test("blogs have id", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect((res) => expect(res.body[0].id).toBeDefined());
	})

	test("upload works", async () => {
		const initialBlogs = await api.get("/api/blogs")
		const newBlog = {
			title: "Testing",
			author: "Leon Sas",
			url: "www.google.com",
			likes: 12
		}
		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
		const updatedBlogs = await api.get("/api/blogs")
		expect(updatedBlogs.body.length).toBe(initialBlogs.body.length + 1);
	})
})


describe('deleting a blog', () => {
	test('succeeds with status 204 if id exists', async () => {

		const blogs = await api.get("/api/blogs")
		const deleteBlog = blogs.body[0]
		console.log(deleteBlog.id)
		await api
			.delete(`/api/blogs/${deleteBlog.id}`)
			.expect(204)
	})

	test('fails with 404 if id doesnt exist', async () => {
		const id = mongoObjectId()
		await api
			.delete(`/api/blogs/${id}`)
			.expect(404)
	})
})

describe('uploading a blog', () => {
	test("blog likes is set to 0", async () => {
		const newBlog = {
			"title": "Testing",
			"author": "Leon Sas",
			"url": "www.google.com"
		}

		const response = await api.post("/api/blogs").send(newBlog)
		expect(response).toBeDefined()
		expect(response.body.likes).toBe(0)
	})

	test("reponse 400 if !url", async () => {
		const newBlog = {
			author: 'Test Author',
			url: 'http://www.testurl.com',
			likes: 0
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})

	test("reponse 400 if !url", async () => {
		const newBlog = {
			title: "Testing",
			author: 'Test Author',
			likes: 0
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})
})


afterAll(() => {
	mongoose.connection.close();
});