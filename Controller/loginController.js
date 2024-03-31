const jwt = require("jsonwebtoken");
const teachreSchema=require("./../Model/teacherModel"); 
const bcrypt = require("bcrypt");
exports.login = (request, response, next) => {
  teachreSchema.findOne({
      fullName: request.body.fullName
  })
  .then(teachers => {
      if (!teachers) {
          throw new Error("Teacher not found");
      }
      const passwordMatch = bcrypt.compareSync(request.body.password, teachers.password);
      if (!passwordMatch) {
          throw new Error("Incorrect password");
      }
    
      let role = teachers.role;
      let tokenData = {};
      if (role === 'admin') {
          tokenData.role = 'admin';
      } else if (role === 'teacher') {
          tokenData.role = 'teacher';
      }
      
      let token = jwt.sign(
          { tokenData },
          process.env.secret_key,
          { expiresIn: "24hr" }
      );

      response.json({ data: "Authenticated", token });
  })
  .catch((error) => next(error));
};
