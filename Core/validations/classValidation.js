const { body, param, query } = require("express-validator");

exports.post     = [
    body("_id").optional()
    .isInt()
    .withMessage("Class ID should be an integer"),
    body("name").isString().withMessage("Name must be string"),
    body("supervisor").optional().isMongoId().withMessage("supervisor must be object id"),
    body("children").optional().isArray().withMessage("children must be array of ids"),
    body("children.*").optional().isNumeric().withMessage("children must be array of ids"),
];

exports.update = [
    body("id").isInt().withMessage("Id Shoud be Number"),
    body("name").optional().isString().withMessage("Name must be string"),
    body("supervisor").optional().isMongoId().withMessage("supervisor must be object id"),
    body("children").optional().isArray().withMessage("children must be array of ids"),
    body("children.*").optional().isNumeric().withMessage("children must be array of ids"),
];

exports.delete = [
    body("id").isInt().withMessage("Id Shoud be Number")
]

exports.getByIdValidator = [
    param("id")
      .isInt()
      .withMessage("Class ID must be an integer")
  ];