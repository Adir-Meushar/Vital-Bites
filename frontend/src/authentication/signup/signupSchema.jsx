import Joi from "joi";

 export const signupSchema = Joi.object({
    fullName: Joi.string().required(),
    
    role: Joi.string()
      .valid("user", "admin")
      .default("user"),
      
    email: Joi.string().email({ tlds: false }).required(),

    password: Joi.string()
      .min(6) 
      .required(),
      
    createdAt: Joi.date().default(() => new Date()),
  });
  