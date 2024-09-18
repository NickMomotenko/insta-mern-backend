import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль слишком короткий").isLength({ min: 4 }),
  body("nickname", "nickname короткий").isLength({ min: 4 }),
];
