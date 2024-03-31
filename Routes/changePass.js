const express = require("express");
const changePassController = require('./../Controller/changePassController');
const validateMW = require("./../Core/validations/validateMW");
const {changepassword } = require("../Core/validations/teacherValidation");
const router = express.Router();
router.post("/changePassword/:id",changePassController.changePassword);

module.exports = router;