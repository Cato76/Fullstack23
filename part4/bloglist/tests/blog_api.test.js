const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.author)

  expect(contents).toContain(
    'Robert C. Martin'
  )
})

test('a blog can be added ', async () => {
  const newBlog = {
    title: "Notes from earth",
    author: "Gigantti",
    url: "http://BlogsFromEarth.com",
    likes: 11
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const blogTitles = blogsAtEnd.map(n => n.title)
  expect(blogTitles).toContain(
    'Notes from earth'
  )
})

test('id is defined', async () => {
  const blogs = await helper.blogsInDB()

  expect(blogs[0].id).toBeDefined();
});

test('undefined likes will result in default value of 0', async () => {
  const newBlog = {
    title: "Notes from earth",
    author: "Gigantti",
    url: "http://BlogsFromEarth.com",
  }

  result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(result.body.likes).toBe(0)

});

test('blog without URL will result in code 400', async () => {
  const newBlog = {
    title: "Notes from earth",
    author: "Gigantti",
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

test('a blog can be deleted', async () => {
  const blogs = await helper.blogsInDB()
  const blogToDelete = blogs[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDB()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const contents = blogsAtEnd.map(r => r.url)

  expect(contents).not.toContain(blogToDelete.url)
})

test('a blog can be updated', async () => {
  const blogs = await helper.blogsInDB()
  const blogToUpdate = blogs[0]

  oldLikes = blogToUpdate.likes
  newLikes = 115

  blogToUpdate.likes = newLikes


  result = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)


  expect(result.body.likes).toBe(newLikes)
  expect(result.body.author).toBe(blogs[0].author)
})

afterAll(async () => {
  await mongoose.connection.close()
})