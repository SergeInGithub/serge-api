const Joi = require('joi');

exports.postValidation = Joi.object({
    title: Joi.string().trim()
      .min(3)
      .max(30)
      .required(),

    content: Joi.string().trim()
      .min(3)
      .max(1500)
      .required(),

  })
  .with('title', 'content')
