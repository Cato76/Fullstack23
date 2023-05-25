const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const blog = new Blog(request.body)
  try {
    result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    response.status(400).send()
  }
})

blogsRouter.delete('/:id', async (request, response) => {

  query = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {

  const blog = request.body

  updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.status(200).json(updatedNote)

})

module.exports = blogsRouter