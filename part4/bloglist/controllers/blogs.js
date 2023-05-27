const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', async (request, response) => {
  blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {

  if (!request.user) {
    return response.status(401).json({ error: '! token invalid' })
  }

  try {

    const blog = new Blog(request.body)
    blog.user = request.user._id
    result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    return response.status(401).json({ error: '! token invalid' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {

  if (!request.user) {
    return response.status(401).json({ error: '! token invalid' })
  }
  try {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user.id) {
      await Blog.findByIdAndRemove(request.params.id)
      return response.status(204).end()
    } else
      return response.status(403).json({ error: 'no permision' })

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: '! token invalid' })
    } else
      console.log(error)
    return response.status(400).send("error 400")
  }

})

blogsRouter.put('/:id', async (request, response) => {

  const blog = request.body

  updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.status(200).json(updatedNote)

})

module.exports = blogsRouter