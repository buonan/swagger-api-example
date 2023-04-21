import express from 'express';
import * as mongoose from 'mongoose';
import { RegisterRoutes } from './routes/routes';

// Must be before using process.env
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../public/swagger.json");
const mongoRootUsername = process.env.MONGO_ROOT_USERNAME
const mongoRootPassword = process.env.MONGO_ROOT_PASSWORD
const dbUrl = `mongodb://mongo:27017`;
const mongoAdmin = 'admin'

app.use(express.json());
app.use(express.static("public"));
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.listen(port, async () => {
  await mongoose.connect(`${dbUrl}`, {
    authSource: mongoAdmin,
    auth: {
      username: mongoRootUsername,
      password: mongoRootPassword
    },
  }).then(() => {
    console.log("Mongodb connected!")
    console.log(`Example app listening on port ${port}`)
  }).catch((err) => {
    console.log(err)
  });
})

// Register tsoa routes
RegisterRoutes(app);