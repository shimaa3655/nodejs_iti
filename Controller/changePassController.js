const bcrypt = require("bcrypt");
const teachreSchema = require("./../Model/teacherModel");

exports.changePassword = async (request, response, next) => {
    try {
        const id = request.params.id; 
        const {Password, newPassword } = request.body;
        const teacher = await teachreSchema.findById(id);
        if (!teacher) {
            throw new Error("Teacher not found");
        }

        const isPasswordValid = bcrypt.compareSync(Password, teacher.password);

        if (isPasswordValid) {
            const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
            teacher.password = hashedNewPassword;
            await teacher.save();
            response.status(200).json({ message: "Password updated successfully" });
        } else {
            throw new Error("Incorrect current password");
        }
    } catch (error) {
        next(error);
    }
};
