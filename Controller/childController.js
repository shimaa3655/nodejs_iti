 
const childernSchema=require("./../Model/childModel"); 

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



exports.deleteChild=(request,response,next)=>{
    childernSchema.deleteOne({
        _id: request.body.id
    }).then((data) =>{
        if(data.deletedCount == 0)
            new Error("Not Found")
        else
            response.status(200).json(data);
    })
    .catch((error) => next(error));
}