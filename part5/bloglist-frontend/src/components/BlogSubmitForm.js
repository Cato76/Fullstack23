/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable linebreak-style */
import { useState } from 'react'
import PropTypes from 'prop-types'


const BlogSubmitForm = ({ submitBlog }) => {

  BlogSubmitForm.propTypes = {
    submitBlog:PropTypes.func.isRequired
  }

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog=(event) => {
    event.preventDefault()
    submitBlog({ title:title, author:author, url:url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div className="submitUser">title: <input value={title} id={'title'} onChange={event => setTitle(event.target.value)} placeholder='write title here'/>
        author: <input value={author} id={'author'} onChange={event => setAuthor(event.target.value)} placeholder='write author here'/>
        url: <input value={url} id={'url'} onChange={event => setUrl(event.target.value)} placeholder='write url here'/>
          <button type="submit" id={'createButton'} >save</button></div>
      </form>
    </div>
  )
}

export default BlogSubmitForm