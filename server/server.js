const express = require("express");
const path = require("path");
const routes = require("./routes");
const connectDB = require("./config/connection");
require("dotenv").config({ path: "./config/.env" })

const PORT = process.env.PORT || 5001;
const app = express();

connectDB()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

app.use(routes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
