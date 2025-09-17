const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
require("dotenv").config();

// middlewares
app.use(express.static("./public"));
app.use(express.json());

//Router
// app.get("/hello", (req, res) => {
//   res.send("<h1>Hello World</h1>");
// });

app.use("/api/v1/tasks", tasks);

app.use(notFound);

const port = 3000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
