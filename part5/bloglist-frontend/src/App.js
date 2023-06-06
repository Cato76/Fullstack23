import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState()
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const [info, setInfo] = useState()



  const renderMessage = (message) => {
    setInfo(message)
    setTimeout(() => {
      setInfo(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

 
  const submitBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title : title,
      author:author,
      url:url
    }
    
    blogService
      .create(blogObject)
        .then(returned => {
        setBlogs(blogs.concat(returned))
        renderMessage(`a new blog ${title} by ${author} added`)
      }).catch(error => {
        renderMessage(`a blog ${title} by ${author} failed to be added!`)
      })
    
  }

  


  const loginListener = (event) => {
    event.preventDefault()

    if(username.length<4 || password.length<4){
      return renderMessage("error: login information too short")
    }
    loginService.login({username:username, password:password}).then(user => {
      setUser(user)
      setUsername("")
      setPassword("")
      window.localStorage.setItem("user", JSON.stringify(user))
      blogService.setToken(user.token)
      renderMessage(`Login was successful!`)
    }).catch(error => {
      renderMessage("error login")
    })

  }

  const handleNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlepasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleTitle = (event) =>{
    setTitle(event.target.value)
  }

  const handleAuthor = (event) =>{
    setAuthor(event.target.value)
  }

  const handleUrl = (event) =>{
    setUrl(event.target.value)
  }
  const logout=()=>{
    setUser()
    window.localStorage.removeItem('user')
    renderMessage(`Logged out successfully!`)

  }

  
  if(!user){
    return (
      <div>
        <h2>blogs</h2>
        <ErrorNotifcation message={info} />
        <UserForm onSubmit={loginListener} username={username} password={password} handleNameChange={handleNameChange} handlepasswordChange={handlepasswordChange}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }else{
    return (
      <div>
        <h2>blogs</h2>
        <>{user.name} logged in</>
        <button onClick={() => logout()}>logout</button>
        <ErrorNotifcation message={info} />
        <BlogSubmitForm onSubmit={submitBlog} title={title} handleTitle={handleTitle} author={author} handleAuthor={handleAuthor} url={url} handleUrl={handleUrl}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

}

const UserForm = ({username, password, handleNameChange, handlepasswordChange, onSubmit}) => {

  return (
    <form onSubmit={onSubmit}>
      <div className="submitUser">Username: <input value={username} onChange={handleNameChange} />
      Password: <input value={password} onChange={handlepasswordChange} />
      <button type="submit">save</button>
      </div>
    </form>
  )
}

const BlogSubmitForm = ({onSubmit, title, handleTitle, author, handleAuthor, url, handleUrl}) => {

  return (
    <form onSubmit={onSubmit}>
      <h2>create new</h2>
      <div className="submitUser">title: <input value={title} onChange={handleTitle} />
      author: <input value={author} onChange={handleAuthor} />
      url: <input value={url} onChange={handleUrl} />
      <button type="submit">create</button></div>
    </form>
  )
}

const ErrorNotifcation = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App