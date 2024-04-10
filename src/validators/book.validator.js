import Joi from 'joi';

const bookSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  available: Joi.number().integer().min(0).required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
  category_id: Joi.number().required()
});

export const validateBook = (book) => {
  return bookSchema.validate(book);
};

