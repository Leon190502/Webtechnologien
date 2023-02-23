const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/)
		.expect((res) => {
			console.log(typeof res.body, res.body);
			expect(res.body).toHaveLength(1);
		});
});

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

afterAll(() => {
	mongoose.connection.close();
});