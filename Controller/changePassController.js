const bcrypt = require("bcrypt");
const teachreSchema = require("./../Model/teacherModel");

exports.changePassword = async (request, response, next) => {
    console.log(request)
    try {
        const id = request.params.id; 
        const { password, newPassword } = request.body;
        
        const teacher = await teachreSchema.findById(id);
        if (!teacher) {
            throw new Error("Teacher not found");
        }

        const isPasswordValid = await bcrypt.compare(password, teacher.password);

        if (isPasswordValid) {
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
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
