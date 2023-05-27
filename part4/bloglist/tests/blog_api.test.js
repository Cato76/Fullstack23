const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let token =null

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  testUser ={
    
      "username": "username",
      "password": "1234",
      "name":"ensimmäinen käyttäjä"
  }
  regResults = await api.post('/api/users').send(testUser)

  

  login = 
  {
    "username": "username",
    "password": "1234"
  }
  
  results = await api.post('/api/login')
  .send(login)

  const output = JSON.parse(results.text)
  
  token = 'Bearer '+output.token
  
  
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
    .set('Authorization', token)
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
    .set('Authorization', token)
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
    .set('Authorization', token)
    .expect(400)

})

test('a blog can be deleted', async () => {
  

  const newBlog = {
    title: "Notes from earth",
    author: "Gigantti",
    url: "http://BlogsFromEarth.com",
    likes: 11
  }

  const added =await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', token)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogToDelete=added._body.id

  await api
    .delete(`/api/blogs/${blogToDelete}`)
    .set('Authorization', token)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDB()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length
  )

  const IDs = blogsAtEnd.map(r => r.id)

  expect(IDs).not.toContain(blogToDelete)
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