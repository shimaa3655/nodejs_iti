// const express = require("express");
// const controller = require("./../Controller/loginController");
// const router = express.Router();

// router.post("/login",controller.login);

// module.exports = router;


//////////////


/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Login and authentication
 */

const express = require("express");
const controller = require("./../Controller/loginController");
const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user and get JWT token
 *     description: Authenticate user and generate JWT token. Returns the token on successful authentication.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       
 *       '404':
 *         description: Teacher not found or incorrect password
 */
router.post("/login", controller.login);

module.exports = router;
