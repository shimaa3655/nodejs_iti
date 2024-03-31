const jwt = require("jsonwebtoken");
module.exports = (request,response,next)=>{
    try{
       const token = request.headers.authorization.split(" ")[1];//الريكويست بتاعى ال داخل عاوزة ادور ع 
        // Verify the token
        const decodedToken = jwt.verify(token,process.env.secret_key);
       // console.log(decodedToken);
        //{ tokenData: { role: 'admin' }, iat: 1711765862, exp: 1711852262 }
        const role = decodedToken.tokenData.role; // Access the role property inside tokenData
        //console.log(role);
        // Set the role in the request object
        request.tokenRole = role;
        next();
    }catch(error){
        error.status=401;
        error.message="Unauthorized";
        next(error);
    }
}


module.exports.isAdmin=(request,response,next)=>{
if(request.tokenRole=="admin"){
    //console.log(request.tokenRole);
    next()
}
    else{
       let error=new Error("not authorized ");
       error.status=403;
       next(error);
    }
}

module.exports.checkAdminOrTeacher = (request,response,next)=>{
    if(request.tokenRole == "admin" ||request.tokenRole== "teacher"){
        //console.log(request.tokenRole);
        next();
    }else{
       
        let error = new Error("Not Allowed - Forbidden");
        error.status=403;
        next(error);
    }
}

