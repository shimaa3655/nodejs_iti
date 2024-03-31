
const classSchema =require("./../Model/classModel");
const childernSchema=require("./../Model/childModel"); 
const teachreSchema=require("./../Model/teacherModel");
exports.getAllClasses=(request,response,next)=>{
    classSchema.find({})
    .then((classes) => {
      response.status(200).json({classes});
    })
    .catch((error) => next(error));
}

exports.getClassById = (req, res, next) => {
    classSchema.findOne({_id : req.params.id})
        .then((classObject) => {
          if (!classObject) {
            throw new Error("Class not exists.......");
          }
          res.status(200).json({ class : classObject });
        })
        .catch((error) => {next(error)});
  };

exports.addClass=(request,response,next)=>{
    let classObject = new classSchema(request.body);
  classObject
      .save()
      .then((classObj) => {
        response.status(200).json({ class : classObj, message: "Class Added Successfully"});
      })
      .catch((error) => next(error));
}

exports.updateClass=(request,response,next)=>{
    const id = request.body._id; 
  const update = request.body;
  classSchema.findByIdAndUpdate(id, update, { new: true })
      .then(classObject => {
        if (!classObject) {
          return res.status(404).json({ message: "Class not exists." });
        }
        response.status(200).json({ class: classObject, message: "Class updated successfully" });
      })
      .catch(error => next(error));
}

exports.deleteClass=(request,response,next)=>{
    classSchema.deleteOne({_id:request.body.id})
    .then(data=>{
    if(data.deletedCount == 0){
        throw new Error("Not Found")
    }else{
        response.status(200).json({message:"deleted succeully"});
    }
    })
    .catch(error=>next(error))
}

exports.getAllClassChildren = (req, res, next) => {
    const classId = req.params.id;

    classSchema.findById(classId)
        .populate('children')
        .then((classObject) => {
            if (!classObject) {
                throw new Error("Class not exists.......");
            }

            res.status(200).json({ childs : classObject.children});
        })
        .catch((error) => {
            next(error)
        })

};

exports.getAllClassSupervisorInfo = (req, res, next) => {
    const classId = req.params.id;

    classSchema.findById(classId)
        .populate('supervisor')
        .then((classObject) => {
            if (!classObject) {
                throw new Error("Class not exists.......");
            }

            res.status(200).json({ supervisors : classObject.supervisor});
        })
        .catch((error) => {
            next(error)
        })
};