const express = require("express");
const app = express();
const path = require("path");
// const fetch = require("node-fetch");
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables
// const SECRETKEY = process.env.SECRETKEY || require("./secretkey.js");
app.use(express.static("dist"));
app.get("/", (request, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
}); 
console.log(path.join(__dirname, "./dist/index.html"))
app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});