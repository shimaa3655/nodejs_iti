

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Class management
 */

const express = require("express");
const router = express.Router();
const controller = require("./../Controller/classController");
const validateMW = require("./../validations/validateMW");
const classValidation = require("../validations/classValidation");

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Get all classes
 *     description: Retrieve a list of all classes.
 *     tags: [Classes]
 *     responses:
 *       '200':
 *         description: A list of classes
 */
router.get("/classes", controller.getAllClasses);

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Add a new class
 *     description: Add a new class to the system.
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               supervisor:
 *                 type: string
 *               children:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       '201':
 *         description: Class added successfully
 *       '400':
 *         description: Bad request
 */
router.post("/classes", classValidation.post, validateMW, controller.addClass);

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Get class by ID
 *     description: Retrieve a class by its ID.
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the class to retrieve.
 *     responses:
 *       '200':
 *         description: A single class object
 *       '404':
 *         description: Class not found
 */
router.get("/classes/:id", classValidation.getByIdValidator, validateMW, controller.getClassById);

/**
 * @swagger
 * /classes:
 *   patch:
 *     summary: Update class
 *     description: Update a class's information.
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: number
 *               name:
 *                 type: string
 *               supervisor:
 *                 type: string
 *               children:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       '200':
 *         description: Class updated successfully
 *       '404':
 *         description: Class not found
 */
router.patch("/classes", classValidation.update, validateMW, controller.updateClass);

/**
 * @swagger
 * /classes:
 *   delete:
 *     summary: Delete class
 *     description: Delete a class by its ID.
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Class deleted successfully
 *       '404':
 *         description: Class not found
 */
router.delete("/classes", classValidation.delete, validateMW, controller.deleteClass);

/**
 * @swagger
 * /classes/childern/{id}:
 *   get:
 *     summary: Get all children of a class
 *     description: Retrieve all children associated with a class by its ID.
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the class to retrieve children from.
 *     responses:
 *       '200':
 *         description: A list of children
 *       '404':
 *         description: Class not found
 */
router.get("/classes/childern/:id", classValidation.getByIdValidator, validateMW, controller.getAllClassChildren);

/**
 * @swagger
 * /classes/teachers/{id}:
 *   get:
 *     summary: Get supervisor of a class
 *     description: Retrieve the supervisor of a class by its ID.
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the class to retrieve supervisor from.
 *     responses:
 *       '200':
 *         description: Supervisor information
 *       '404':
 *         description: Class not found
 */
router.get("/classes/teachers/:id", classValidation.getByIdValidator, validateMW, controller.getAllClassSupervisorInfo);

module.exports = router;
