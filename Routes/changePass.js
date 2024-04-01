/**
 * @swagger
 * tags:
 *   name: ChangePassword
 *   description: Teacher management APIs
 */

const express = require("express");
const changePassController = require('./../Controller/changePassController');
const validateMW = require("./../validations/validateMW");
const teacherValidation = require("../validations/teacherValidation");
const auth = require('../Middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /changePassword/{id}:
 *   post:
 *     summary: Change password of a teacher
 *     tags: [ChangePassword]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the teacher
 *         schema:
 *           type: string
 *       - in: body
 *         name: Change Password
 *         description: Request to change password
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *               description: Current password
 *             newPassword:
 *               type: string
 *               description: New password
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Teacher not found
 *       401:
 *         description: Unauthorized
 */
router.post("/changePassword/:id", auth.checkAdminOrTeacher, teacherValidation.changepassword, validateMW, changePassController.changePassword);

module.exports = router;
