// const express = require("express");
// const router = express.Router();
// const controller = require("../Controller/childController");
// const validateMW = require("../Core/validations/validateMW");
// const childValidation = require("../Core/validations/childValidation");

// router.route("/childern")
//     .get(controller.getAllChildern)
//     .post(childValidation.post,validateMW,controller.addChild)
//     .patch(childValidation.update,validateMW,controller.updateChild)
//     .delete(childValidation.delete,validateMW,controller.deleteChild)
//     router.get("/childern/:id",controller.getChildById)
//     //router.patch('/childern/:_id',childValidation.update, validateMW,controller.updateChild);
// module.exports = router;
//////////////////////////////////////

/**
 * @swagger
 * tags:
 *   name: Children
 *   description: Child management
 */

const express = require("express");
const router = express.Router();
const controller = require("../Controller/childController");
const validateMW = require("../Core/validations/validateMW");
const childValidation = require("../Core/validations/childValidation");

/**
 * @swagger
 * /childern:
 *   get:
 *     summary: Get all children
 *     description: Retrieve a list of all children.
 *     tags: [Children]
 *     responses:
 *       '200':
 *         description: A list of children
 */
router.get("/childern", controller.getAllChildern);

/**
 * @swagger
 * /childern:
 *   post:
 *     summary: Add a new child
 *     description: Add a new child to the system.
 *     tags: [Children]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               age:
 *                 type: number
 *               level:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   street:
 *                     type: string
 *                   building:
 *                     type: string
 *     responses:
 *       '201':
 *         description: Child added successfully
 *       '400':
 *         description: Bad request
 */
router.post("/childern", childValidation.post, validateMW, controller.addChild);

/**
 * @swagger
 * /childern/{id}:
 *   get:
 *     summary: Get child by ID
 *     description: Retrieve a child by its ID.
 *     tags: [Children]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the child to retrieve.
 *     responses:
 *       '200':
 *         description: A single child object
 *       '404':
 *         description: Child not found
 */
router.get("/childern/:id", controller.getChildById);

/**
 * @swagger
 * /childern:
 *   patch:
 *     summary: Update child
 *     description: Update a child's information.
 *     tags: [Children]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               fullName:
 *                 type: string
 *               age:
 *                 type: number
 *               level:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   street:
 *                     type: string
 *                   building:
 *                     type: string
 *     responses:
 *       '200':
 *         description: Child updated successfully
 *       '404':
 *         description: Child not found
 */
router.patch("/childern", childValidation.update, validateMW, controller.updateChild);

/**
 * @swagger
 * /childern:
 *   delete:
 *     summary: Delete child
 *     description: Delete a child by its ID.
 *     tags: [Children]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Child deleted successfully
 *       '404':
 *         description: Child not found
 */
router.delete("/childern", childValidation.delete, validateMW, controller.deleteChild);

module.exports = router;
