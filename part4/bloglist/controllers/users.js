const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {


  const body = request.body

  isUnique = await usernameIsUnique(body.username)

  if(body.username.length<3 || body.name.length<3 || body.password.length<3 || !isUnique){
      return response.status(400).
      send(`User's name, username and password must be at least three characters long, and username must be unique. username submitted was unique:${isUnique}`)
  }

  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

const usernameIsUnique=async (username)=>{
  result = await User.findOne({username: username})
  if(result){
    return false
  }else{
    return true
  }
}

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', {title:1,url:1,author:1})
  response.json(users)
})

module.exports = usersRouter