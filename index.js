import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import * as UserController from "./src/controllers/UserController.js";
import checkAuth from "./src/utils/checkAuth.js";

import { registerValidation } from "./src/validations/auth.js";
import handleValidationErrors from "./src/validations/handleValidationErrors.js";
import multer from "multer";
// import { handleValidationErrors } from "./src/validations/handleValidationErrors.js";

const url =
  process.env.MONGODB_URL ||
  "mongodb+srv://nickforloft:saker1997@cluster0.oq4ob.mongodb.net/instadb?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas", err));

const app = express();

const storage = multer.diskStorage({
  destination: (req, _, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.get("/auth/me", checkAuth, UserController.getMe);
app.post("/auth/login", UserController.login);
app.post("/auth/check", UserController.checkDataByEmailOrNickname);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  } catch (err) {
    console.log(err);

    res.status(404).json({
      message: "Не удалось загрузить аватар",
    });
  }
});

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("server ok");
});
