const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { blogsRouter } = require("./controllers/blogs");
const logger = require("./utils/logger");
const config = require("./utils/config");
const { usersRouter } = require("./controllers/users");
const { loginRouter } = require('./controllers/login')

mongoose.connect(config.MONGODB_URI);

logger.info("connected to MongoDB");

app.use(cors());
app.use(express.json());


app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

module.exports = app;