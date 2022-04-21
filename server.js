const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json({ extended: false }));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DATABASE CONNECTED");
  });

app.use("/items", require("./routes/items"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`SERVER WORKING ON ${port}`);
});
