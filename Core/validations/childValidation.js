const { body, param, query } = require("express-validator");

exports.post = [
    body("_id")
    .optional()
    .isInt()
    .withMessage("Class ID should be an integer"),
    body("fullName")
        .isString()
        .withMessage("fullName should be string")
        .isLength({ max: 30 })
        .withMessage("child name < 10"),
    body("level")
        .isIn(["PREKG", "KG1", "KG2"])
        .withMessage("You should select one of existed levels"),
    body("age")
        .isInt()
        .withMessage("Age should be Number"),
    body("address.city").isString().withMessage("Invalid city"),
    body("address.street").isString().withMessage("Invalid street"),
    body("address.building").isNumeric().withMessage("Invalid bulding")

];

exports.update = [
    body("id")
        //.optional()
        .isInt()
        .withMessage("child Id should be integer"),
    body("fullName")
        .optional()
        .isString()
        .withMessage("fullName should be string")
        .isLength({ max: 30 })
        .withMessage("child name <10"),
    body("level")
        .optional()
        .isIn(["PREKG", "KG1", "KG2"])
        .withMessage("You should select one of existed levels"),
    body("age")
        .optional()
        .isInt()
        .withMessage("Age should be Number"),
    body("address.city").optional().isString().withMessage("Invalid city"),
    body("address.street").optional().isString().withMessage("Invalid street"),
    body("address.building").optional().isNumeric().withMessage("Invalid bulding")


];

exports.delete = [
    body("id").isInt().withMessage("Id Shoud be Number"),
]