const { body, param, query } = require("express-validator");

exports.post = [
    // body("_id")
    // .isMongoId()
    // .withMessage("teacher id should be object ID"),
    body("fullName").isString().withMessage("Full Name must be string"),
    body("email").isEmail().withMessage("Email Invalid Format"),
     //body("image").isString().withMessage("image Invalid Must be String"),
    body('password').isLength({ min: 8 }).withMessage("teacher password min length 8"),
    // body("role")
    //     .optional()
    //     .isIn(["admin","teacher"])
    //     .withMessage("You should select one of existed"),
];

exports.update = [
    body("fullName").optional().isString().withMessage("Full Name must be string"),
    body("email").optional().isEmail().withMessage("Email Invalid Format"),
    //body("image").optional().isString().withMessage("image Invalid Must be String"),
    body('password').optional().isLength({ min: 8 }).withMessage("teacher password min length 8"),
];

exports.delete = [
    param("id").isMongoId().withMessage("Id Shoud be Object"),
]

exports.changepassword=[
    body('newPassword').isLength({ min: 8 }).withMessage("teacher password min length 8"),
];