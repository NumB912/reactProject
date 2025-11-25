import { body, type ValidationChain } from "express-validator";

export const loginValidationRules: ValidationChain[] = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email không được để trống")
    .bail()
    .isEmail()
    .withMessage("Email không đúng định dạng")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Mật khẩu không được để trống")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải có ít nhất 6 ký tự"),
];
