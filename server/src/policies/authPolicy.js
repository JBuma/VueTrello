const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    console.log(req.body)
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$'))
    }
    Joi.validate(req.body, schema, function (err, val) {
      if (err) {
        // console.log(err.details[0].context.key)
        if (err.details[0].context.key.toString() === 'email') {
          console.log(err.details[0].context.key, 'EMAIL ERROR')
          res.status(400).send({
            error: 'Your email must be valid'
          })
        } else if (err.details[0].context.key === 'password') {
          console.log(err.details[0].context.key)
          res.status(400).send({
            error:
              'Password can contain only letters and numbers, and must be between 8 and 32 characters long.'
          })
        } else {
          console.log(err)
          res
            .status(400)
            .send({ error: 'Something went wrong!</br>' + err.message })
        }
      } else {
        // console.log('Success!')
        next()
      }
    })
  }
}
