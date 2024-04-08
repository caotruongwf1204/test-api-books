import joi from "joi";

export const registerValidator = (data) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30).required(),
  });

  return schema.validate(data);
};

export const loginValidator = (data) => {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).max(30).required(),
    });
  
    return schema.validate(data);
  };
