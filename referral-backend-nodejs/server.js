const express = require("express");
const app = express();
const connectDB = require("./config/db");
const routes = require("./config/routes");
const cors = require("cors");
const helmet = require("helmet");

app.use(express.json());
app.use(helmet());
app.use(cors());
connectDB();

app.use("/", routes);

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
