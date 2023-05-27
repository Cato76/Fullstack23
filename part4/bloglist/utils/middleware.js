const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {

  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '')
    request.token = token
    next()
  } else
    next()
}

const userExtractor = async (request, response, next) => {

  if (request.token) {
    try {

      const decodedToken = jwt.verify(request.token, process.env.SECRET)

      if (!decodedToken.id) {
        return next()
      }
      request.user = await User.findById(decodedToken.id)

      next()
    } catch (error) {
      return next()
    }
  } else {
    next()
  }
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
module.exports = { tokenExtractor, unknownEndpoint, userExtractor } 