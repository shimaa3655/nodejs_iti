
const bcrypt = require("bcrypt");
const teachreSchema=require("./../Model/teacherModel"); 
const classSchema =require("./../Model/classModel");


exports.getAllteachers=(request,response)=>{
    teachreSchema.find({})
                .then((data)=>{
                    response.status(200).json({data});        
                })
                .catch((error)=>{
                    next(error);
                })
}


exports.addteacher = async (request, response, next) => {
    try {
        const { fullName, email, password } = request.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const teacher = new teachreSchema({
            fullName,
            email,
            password: hashedPassword,
            image: request.file.path
        });

        const savedTeacher = await teacher.save();

        response.status(201).json({ data: savedTeacher });
    } catch (error) {
        next(error);
    }
};


exports.getTeacherById=(request,response,next)=>{
    teachreSchema.findOne({_id:request.params.id})
    .then(data=>{
        //data is null 
        if(!data)
        throw new Error("id doesnt exist ");

        response.status(200).json({data});
    })
    .catch(error=>next(error));
}

// exports.updateteacher=(request,response,next)=>{
//     teachreSchema.updateOne({
//         _id:request.body.id
//     },{
//         $set:{
//             fullName:request.body.fullName,
//             email:request.body.email,
//             image:request.body.image
//         }
//     }).then(data=>{
//         if(data.matchedCount==0)
//             next(new Error("Teacher not Found"));
//         else
//             response.status(200).json({data});
//     })
//     .catch(error=>next(error));
// }

exports.updateteacher = async (request, response, next) => {
    try {
        const id = request.params.id; 
        const { fullName, email, password } = request.body;
        const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;
        const updateData = {
            $set: {
                fullName,
                email,
                image:request.file.path
            }
        };
        if (hashedPassword) {
            updateData.$set.password = hashedPassword;
        }
        const updatedTeacher = await  teachreSchema.updateOne({ _id: id }, updateData);
        console.log(updatedTeacher);
        if (updatedTeacher.matchedCount === 0) {
            throw new Error("Teacher not found");
        }

        response.status(200).json({ data: updatedTeacher });
    } catch (error) {
        next(error);
    }
};

// exports.deleteteacher=(request,response,next)=>{
//     teachreSchema.deleteOne({
//         _id:request.params.id
//     }).then(data=>{
//         response.status(200).json({data});
//     })
//     .catch(error=>next(error));
// }

exports.deleteteacher = async (request, response, next) => {
    try {
        const teacherId = request.params.id;
         console.log(teacherId);
        // Find all classes where the teacher is a supervisor
        const classes = await classSchema.find({ supervisor: teacherId });

        // Remove the teacher from the supervisor field in each class
        await Promise.all(classes.map(async (classObj) => {
            classObj.supervisor = null; // Or remove the teacher ID from the array if it's an array field
            await classObj.save();
        }));

        // Delete the teacher
        const result = await teachreSchema.deleteOne({ _id: teacherId });
        if (result.deletedCount === 0) {
            throw new Error("Teacher not found.");
        }

        response.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
        next(error);
    }
};



