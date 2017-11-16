const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    console.log(req.body)
    const schema = {
      username: Joi.string().min(4).max(32),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$'))
    }
    Joi.validate(req.body, schema, function (err, val) {
      if (err) {
        // console.log(err.details[0].context.key)
        if (err.details[0].context.key.toString() === 'username') {
          console.log(err.details[0].context.key, 'EMAIL ERROR')
          res.status(400).send({
            error: 'Your username must be between 4 and 32 characters long'
          })
        } else if (err.details[0].context.key === 'password') {
          console.log(err.details[0].context.key)
          res.status(400).send({
            error:
              'Password can contain only letters and numbers, and must be between 8 and 32 characters long.'
          })
        } else {
          res.status(400).send({ error: 'Something went wrong!' })
        }
      } else {
        console.log('Success!')
        next()
      }
    })
  }
}
