 
const childernSchema=require("./../Model/childModel"); 
const classSchema =require("./../Model/classModel");

exports.getAllChildern=(request,response,next)=>{
    childernSchema.find()
    .then((data) =>{
        response.status(200).json(data);
    })
    .catch((error) => next(error));
}

exports.addChild=(request,response,next)=>{
    const object=new childernSchema(request.body);
    object.save()
    .then(data=>{
        response.status(201).json({data});
    })
    .catch(error => next(error))
}

exports.getChildById=(request,response,next)=>{
    childernSchema.findOne({_id:request.params.id})
    .then(data=>{
        //data is null 
        if(!data)
        throw new Error("id doesnt exist ");
        response.status(200).json({data});
    })
    .catch(error=>next(error));
}

exports.updateChild=(request,response,next)=>{
    childernSchema.updateOne({
        _id: request.body.id,
    },{
        $set: {
            fullName: request.body.fullName,
            age: request.body.age,
            level: request.body.level,
            address: request.body.address
        }
    }).then((data) => {
        if(data.matchedCount == 0)
            throw new Error("Not Found")
        else
            response.status(200).json(data);
    })
    .catch((error) => next(error));
}



exports.deleteChild = (request, response, next) => {
    const childId = request.body.id;
    childernSchema.deleteOne({
        _id: childId
    })
    .then((data) => {
        if (data.deletedCount === 0) {
            throw new Error("Child not found");
        } else {
            return classSchema.findOneAndUpdate(
                { children: childId },
                { $pull: { children: childId } }, 
                { new: true } 
            );
        }
    })
    .then((updatedClass) => {
        if (updatedClass) {
            response.status(200).json({ message: "Child deleted successfully and deleted from this classes", updatedClass });
        } else {

            response.status(200).json({ message: "Child deleted successfully" });
        }
    })
    .catch((error) => next(error));
}
