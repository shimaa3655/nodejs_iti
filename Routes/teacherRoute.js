
const express = require("express");
const router = express.Router();
const auth = require('../Middleware/auth');
const controller = require("./../Controller/teacherController");
const validateMW = require("./../Core/validations/validateMW");
const teacherValidation = require("../Core/validations/teacherValidation");
const multer = require("multer");//pic
const path = require("path");//built in backage in node 

const upload = multer({ 
    storage: multer.diskStorage({//cb =call backfunc 
        destination:(request, file, cb) => {
            cb(null, path.join(__dirname,"../images"));
        },
        filename: (request, file, cb) => {
            let ext = path.extname(file.originalname);
            let fileName = path.basename(file.originalname, ext);
            let finalName =  file.fieldname + '-' + fileName + '-' + Date.now() + ext
            cb(null, finalName);
        }
    }),
    fileFilter: (request, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true);
        } else {
            cb(new Error("file should be Image only."));
        }
    } ,
    
});

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     description: Retrieve a list of all teachers.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of teachers
 *       '401':
 *         description: Unauthorized
 */
router.get("/teachers",auth.checkAdminOrTeacher, controller.getAllteachers);

 /**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Add a new teacher
 *     description: Add a new teacher to the system.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: mongoose.Schema.Types.ObjectId
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Teacher added successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
router.post("/teachers", auth.isAdmin, upload.single('image'), teacherValidation.post, validateMW, controller.addteacher);

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get teacher by ID
 *     description: Retrieve a teacher by its ID.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the teacher to retrieve.
 *     responses:
 *       '200':
 *         description: A single teacher object
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Teacher not found
 */
router.get("/teachers/:id", auth.checkAdminOrTeacher, controller.getTeacherById);


/**
 * @swagger
 * /teachers/{id}:
 *   patch:
 *     summary: Update teacher by ID
 *     description: Update a teacher's information by its ID.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: ID of the teacher to update.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Teacher updated successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Teacher not found
 */
router.patch("/teachers/:id", auth.isAdmin, upload.single('image'), teacherValidation.update, validateMW, controller.updateteacher);

/**
 * @swagger
 * /teachers/{id}:
 *   delete:
 *     summary: Delete teacher by ID
 *     description: Delete a teacher by its ID.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the teacher to delete.
 *     responses:
 *       '200':
 *         description: Teacher deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Teacher not found
 */
router.delete("/teachers/:id", auth.isAdmin, teacherValidation.delete, validateMW, controller.deleteteacher);

/**
 * @swagger
 * /teachers/supervisors:
 *   get:
 *     summary: Get supervisors
 *     description: Retrieve a list of supervisors.
 *     tags: [Teachers]
 *     responses:
 *       '200':
 *         description: A list of supervisors
 */
router.get("/teachers/supervisors", controller.getSupervisors);

module.exports = router;
