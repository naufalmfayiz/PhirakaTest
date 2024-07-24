if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(require("./routes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Users Server listening on port ${port}`);
});
