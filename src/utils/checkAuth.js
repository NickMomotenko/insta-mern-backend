import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret123");

      req.decodedId = decoded._id;

      next();
    } catch (err) {
      return res.status(404).json({
        message: "Нет доступа",
      });
    }
  } else {
    return res.status(404).json({
      message: "Нет доступа",
    });
  }
};
