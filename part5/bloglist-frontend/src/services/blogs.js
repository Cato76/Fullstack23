import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async blog => {

  const config = {
    headers: { Authorization: token },
  }
  console.log(token)

  const response = await axios.delete(baseUrl+`/${blog.id}`, config)
  return response.data
}

const put = async blog => {

  let puBlog =({ user:blog.user.id, likes:blog.likes, author: blog.author, title:blog.title, url:blog.url })

  const response = await axios.put(baseUrl+`/${blog.id}`, puBlog)
  return response.data
}


export default { setToken, create, getAll, put, deleteBlog }