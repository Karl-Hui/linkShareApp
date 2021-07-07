const express = require("express");

const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.get("/", (request, response) => {
  return knex("shareLink")
    .select()
    .then((data) => {
      response.send(data);
    });
});

app.post("/api/share", (request, response) => {
  let link = request.body.link;
  let author = request.body.author;
  let data = request.body;
  console.log("Request", request.body);
  console.log(author);
  console.log(link);
  return knex("shareLink")
    .insert(data)
    .returning("id")
    .then((id) => {
      response.send(id);
    });
});

app.listen(8080, () => {
  console.log("port listening on 8080");
});
