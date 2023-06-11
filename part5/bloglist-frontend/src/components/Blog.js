/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const Blog = ({ blog, deletion, user, updateLikes }) => {

  const [showMore, setShowMore] = useState(false)

  const [likes, setLikes] = useState(blog.likes)

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    deletion:PropTypes.func,
    user:PropTypes.object,
    updateLikes:PropTypes.func
  }


  const like =() => {
    //lazy fix for exerc. 5.15
    if(updateLikes){
      return updateLikes()
    }else{
      blog.likes=likes+1
      blogService.put(blog)
      setLikes(likes+1)
    }
  }


  const deleteBlog =() => {
    blogService.deleteBlog(blog).then(() => {
      deletion(blog)
    })
  }

  if(showMore===false){
    return(
      <div>
        {blog.title} <button onClick={() => setShowMore(true)}>show more</button>

      </div>
    )

  }if(user){
    if(blog.user.username === user.username){
      return(
        <div>

      Title: {blog.title} Author: {blog.author} URL: {blog.url} Votes: {likes} Created by: {blog.user.name}  <button onClick={() => like()}>like</button>
          <button onClick={deleteBlog}>delete</button>
          <button onClick={() => setShowMore(false)}>show less</button>

        </div>
      )
    }}

  return(
    <div>

        Title: {blog.title} Author: {blog.author} URL: {blog.url} Votes: {likes} Created by: {blog.user.name}  <button onClick={() => like()}>like</button>
      <button onClick={() => setShowMore(false)}>show less</button>

    </div>
  )



}


export default Blog