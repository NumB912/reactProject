import { body, type ValidationChain } from "express-validator";

export const signUpValidationRules: ValidationChain[] = [
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

  body("name").trim().notEmpty().withMessage("tên không được để trống"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("số điện thoại không được để trống"),
];
