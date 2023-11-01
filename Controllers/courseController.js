const CourseModel = require("../Models/courseModel");
const Validator=require("./validation.js");
let jwt = require("jsonwebtoken")
let createCourse=async(req,res)=>{
    try{
let data=req.body;
if(!Validator.isValidBody(data)){
    return res.status(404).send({msg:"no data provided"});
}
let{Course_Name,Description,Credit,Duration}=data;

// Course_Name Validation

if(!Validator.isValid(Course_Name)){
    return res.status(400).send({status:false,msg:"course name is required"});

}
let sameCourse_Name=await CourseModel.findOne({Course_Name});
if(sameCourse_Name){
    return res.status(400).send({msg:"This course name already exists"});
}
if(!Validator.isValidName.test(Course_Name)){
return res.status(400).send({status:false,msg:"invalid name"});
}
// description validation

if(!Validator.isValid(Description)){
    return res.status(400).send({msg:"description is required"});
    
}

let sameDescription=await CourseModel.findOne({Description});
if(sameDescription){
    return res.status(400).send({msg:"This description already exists"});
    
}

if(!Validator.isValid(Credit)){
    return res.status(400).send({msg:"credit  is required"});
    
}

if(!Validator.isValid(Duration)){
    return res.status(400).send({msg:"duration  is required"});
    
}


let register=await CourseModel.create(data);
return res.status(201).send({
    status:true,
     msg:"Course Registered Successfully",
     data:register,
});
    }catch(error){
return res
.status(500)
.send({status:false,msg:"Internal Server Error"});
    }
};
module.exports = {createCourse}  