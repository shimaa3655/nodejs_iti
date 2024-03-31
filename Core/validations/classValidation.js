const { body, param, query } = require("express-validator");
const childernSchema=require("../../Model/childModel"); 
const teachreSchema=require("../../Model/teacherModel");
exports.post     = [
    body("_id").optional()
    .isInt()
    .withMessage("Class ID should be an integer"),
    body("name").isString().withMessage("Name must be string"),
    body("supervisor").optional().isMongoId().withMessage("supervisor must be object id").custom(async (value, { req }) => {
        const teacher = await teachreSchema.findById(value);
        if (!teacher) {
            throw new Error(`Child with ID ${value} not found`);
        }
       
        return true;
    }),
    body("children").optional().isArray().withMessage("children must be array of ids") , 
    body("children.*").optional().isNumeric().withMessage("children must be array of ids").custom(async (value, { req }) => {
        const child = await childernSchema.findById(value);
        if (!child) {
            throw new Error(`Child with ID ${value} not found`);
        }
       
        return true;
    }),
];

exports.update = [
    body("_id").isInt().withMessage("Id Shoud be Number"),
    body("name").optional().isString().withMessage("Name must be string"),
    body("supervisor").optional().isMongoId().withMessage("supervisor must be object id").custom(async (value, { req }) => {
        const teacher = await teachreSchema.findById(value);
        if (!teacher) {
            throw new Error(`Child with ID ${value} not found`);
        }
       
        return true;
    }),
    body("children").optional().isArray().withMessage("children must be array of ids"),
    body("children.*").optional().isNumeric().withMessage("children must be array of ids").custom(async (value, { req }) => {
        const child = await childernSchema.findById(value);
        if (!child) {
            throw new Error(`Child with ID ${value} not found`);
        }
       
        return true;
    }),
];

exports.delete = [
    body("id").isInt().withMessage("Id Shoud be Number")
]

exports.getByIdValidator = [
    param("id")
      .isInt()
      .withMessage("Class ID must be an integer")
  ];