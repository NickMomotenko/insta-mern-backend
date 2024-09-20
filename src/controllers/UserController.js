import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import User from "../models/User.js";

import { v4 as uuid } from "uuid";

export const register = async (req, res) => {
  try {
    const emailInDB = await User.findOne({
      "user.email": req.body.email,
    });

    if (emailInDB) {
      return res.status(404).json({
        name: "email",
        message: "Такой email уже используется",
      });
    }

    const nicknameInDB = await User.findOne({
      "user.nickname": req.body.nickname,
    });

    if (nicknameInDB) {
      return res.status(404).json({
        name: "nickname",
        message: "Такой nickname уже используется",
      });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    let userObj = {
      email: req.body.email,
      nickname: req.body.nickname,
      passwordHash: hash,
      id: uuid(),
    };

    const token = jwt.sign(
      {
        _id: userObj.id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    userObj = { ...userObj, token };

    await User.create({ user: userObj });

    res.json({ message: "Вы успешно зарегистрировались" });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось выполнить регистрацию",
    });
  }
};

export const login = async (req, res) => {
  try {
    const isEmail = req.body.email?.includes("@");

    const dataObj = isEmail
      ? { "user.email": req.body.email }
      : { "user.nickname": req.body.email };

    const userData = await User.findOne(dataObj);

    if (!userData) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      userData.user.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Неверный email или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: userData.user.id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...rest } = userData._doc;

    res.json({ ...rest, token });
  } catch (error) {
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.decodedId });

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const { passwordHash, ...rest } = user._doc;

    res.json({ ...rest });
  } catch (err) {
    console.log(err);

    res.status(404).json({
      message: "Нет доступа",
    });
  }
};

export const test = async (req, res) => {
  try {
    res.json({ name: "Nick" });
  } catch (err) {
    console.log(err);

    res.status(404).json({
      message: "Нет доступа",
    });
  }
};
