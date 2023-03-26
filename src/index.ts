import express from 'express';
import Router from "./routes";

const app = express()
const port = 3000
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../public/swagger.json");

app.use(express.json());
app.use(express.static("public"));
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(Router);
