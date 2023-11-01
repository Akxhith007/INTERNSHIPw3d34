const StudentModel = require("../Models/studentModel");
const Validator=require("./validation.js");
const jwt = require('jsonwebtoken');
//registers 
let createStudent = async (req, res)=>{
    try{
        let data = req.body
        if(!Validator.isValidBody(data)){
            return res.status(404).send({msg:"No Data"})
        }


        let{Student_Name, Email, Usn, Gender, Mobile, Password} = data;
        
        // //Student Name Validation
        if(!Validator.isValid(Student_Name)){
            return res.status(400).send({msg:"Student_Name is Required"});
        }
        if(!Validator.isValidName.test(Student_Name)){
            return register.status(400).send({msg:"please enter a valid name"});
        }

        // //Email  Validation
        if(!Validator.isValid(Email)){
            return res.status(400).send({msg:"Email is Required"});
        }

        
        let sameEmail =await StudentModel.findOne({Email})
        if(sameEmail){
            return res.status(400).send({msg: "this Email already exists" });
        }
        
        if(!Validator.isValidEmail.test(Email)){
            return res.status(400).send({msg:"invalid Email"});
        }

        // //Usn  Validation
        if(!Validator.isValid(Usn)){
            return res.status(400).send({msg:"Usn is Required"});
        }

        let sameUsn =await StudentModel.findOne({Usn})
        if(sameUsn){
            return res.status(400).send({msg: "this usn already exists" });
        }

        

        // //Gender Validation
        if(!Validator.isValid(Gender)){
            return res.status(400).send({msg:"Gender is Required"});
        }
        

        // //Mobile Validation
        if(!Validator.isValid(Mobile)){
            return res.status(400).send({msg:"Mobile is Required"});
        }

        let sameMobile=await StudentModel.findOne({Mobile})
        if(sameMobile){
            return res.status(400).send({msg: "this Mobile no already exists" });
        }

        if(!Validator.isValidMobile.test(Mobile)){
            return res.status(400).send({msg:"invalid Number"});
        }


        //Password Validation
        if(!Validator.isValid(Password)){
            return res.status(400).send({msg:"Password is Required"});
        }


        let register = await StudentModel.create(data)
        return res.status(201).send({status:true, msg:"Student registered succesfully",data: register,});
    } catch (error) {
        return res
        .status(500)
        .send({status:false, msg: "internal server error"});
        
    }
};
//login student
let loginStudent=async (req, res)=>{
    try{
        let data =req.body
        if(!Validator.isValidBody(data)){
            return res.status(404).send({status:false,msg:"no data priovided"});

        }

        let {Email,Password}=data;
        if(!Validator.isValid(Email)){
        return res.status(400).send({msg:"plz enter your email"});
        }
        if(!Validator.isValid(Password)){
            return res.status(400).send({msg:"plz enter your password"});
        }



        let matchStudent=await StudentModel.findOne({Email,Password})
        // if(matchStudent){
        //     return res.status(200).send({msg:"student registered"});
        // }
        if(!matchStudent){
            return res.status(200).send({msg:"student not registered"});
        }
        
      
        else{
            const token=jwt.sign({
                studentId:matchStudent._id.toString(),
            },

            "MERN STACK",
            {
                expiresIn:"20000sec",
            });
            return res.status(200).send({msg:"student logged in succesfully",token});
            
        }
    }catch(error){

        return res.status(500).send({status:false,msg:"internal server error"});
    }

};

module.exports = {createStudent,loginStudent}