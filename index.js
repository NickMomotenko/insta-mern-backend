import express from "express";

import mongoose from "mongoose";

import * as UserController from "./src/controllers/UserController.js";
import checkAuth from "./src/utils/checkAuth.js";

import { registerValidation } from "./src/validations/auth.js";
import handleValidationErrors from "./src/validations/handleValidationErrors.js";
// import { handleValidationErrors } from "./src/validations/handleValidationErrors.js";

const url =
  process.env.MONGODB_URL ||
  "mongodb+srv://nickforloft:saker1997@cluster0.oq4ob.mongodb.net/instadb?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas", err));

const app = express();

app.use(express.json());

app.get("/auth/me", checkAuth, UserController.getMe);
app.get("/auth/he", UserController.test);

app.post("/auth/login", UserController.login);

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("server ok");
});
