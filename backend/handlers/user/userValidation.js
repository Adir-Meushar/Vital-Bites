const Joi = require("joi");

const userSignupSchema = Joi.object({
  fullName: Joi.string().required(),
  
  role: Joi.string()
    .valid("user", "admin")
    .default("user"),
    
  email: Joi.string()
    .email()
    .required(),
    
  password: Joi.string()
    .min(6) 
    .required(),
    
  createdAt: Joi.date().default(() => new Date()),
});


const userLoginSchema=Joi.object({
    email: Joi.string()
    .email()
    .required(),
    
  password: Joi.string()
    .min(6) 
    .required(),
})

module.exports = {
    userSignupSchema,
    userLoginSchema,
  };