const express = require("express");
const changePassController = require('./../Controller/changePassController');
const validateMW = require("./../Core/validations/validateMW");
const teacherValidation = require("../Core/validations/teacherValidation");
const router = express.Router();
router.post('/changePassword/:id',teacherValidation.changepassword,validateMW, changePassController.changePassword);

module.exports = router;