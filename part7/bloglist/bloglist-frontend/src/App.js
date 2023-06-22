/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogSubmitForm from "./components/BlogSubmitForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import PropTypes from "prop-types";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [info, setInfo] = useState();

  const [blogFormVisibility, setBlogFormVisibility] = useState(false);

  const renderMessage = (message) => {
    setInfo(message);
    setTimeout(() => {
      setInfo(null);
    }, 5000);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const submitBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
        renderMessage(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        );
        setBlogFormVisibility(false);
      })
      .catch((error) => {
        renderMessage(
          `a blog ${blogObject.title} by ${blogObject.author} failed to be added!`
        );
        console.log(error);
      });
  };

  const loginListener = (event) => {
    event.preventDefault();

    if (username.length < 4 || password.length < 4) {
      return renderMessage("error: login information too short");
    }
    loginService
      .login({ username: username, password: password })
      .then((user) => {
        setUser(user);
        setUsername("");
        setPassword("");
        window.localStorage.setItem("user", JSON.stringify(user));
        blogService.setToken(user.token);
        renderMessage("Login was successful!");
      })
      .catch((error) => {
        renderMessage("error login");
        console.log(error);
      });
  };

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlepasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const logout = () => {
    setUser();
    window.localStorage.removeItem("user");
    renderMessage("Logged out successfully!");
  };

  const deletion = (blogToDelete) => {
    setBlogs(blogs.filter((blog) => blog !== blogToDelete));
  };

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <ErrorNotifcation message={info} />
        <UserForm
          onSubmit={loginListener}
          username={username}
          password={password}
          handleNameChange={handleNameChange}
          handlepasswordChange={handlepasswordChange}
        />
        {blogs
          .sort((a, b) => {
            return b.likes - a.likes;
          })
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <>{user.name} logged in</>
        <button onClick={() => logout()}>logout</button>
        <ErrorNotifcation message={info} />
        {!blogFormVisibility && (
          <button
            onClick={() => setBlogFormVisibility(true)}
            id={"create blog"}
          >
            create blog
          </button>
        )}
        <div>
          {blogFormVisibility && (
            <div>
              <BlogSubmitForm
                submitBlog={submitBlog}
                setBlogFormVisibility={setBlogFormVisibility}
              />
              <button onClick={() => setBlogFormVisibility(false)}>
                cancel
              </button>
            </div>
          )}
        </div>

        {blogs
          .sort((a, b) => {
            return b.likes - a.likes;
          })
          .map((blog) => (
            <Blog key={blog.id} blog={blog} deletion={deletion} user={user} />
          ))}
      </div>
    );
  }
};

const UserForm = ({
  username,
  password,
  handleNameChange,
  handlepasswordChange,
  onSubmit,
}) => {
  UserForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleNameChange: PropTypes.func.isRequired,
    handlepasswordChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="submitUser">
        Username:{" "}
        <input value={username} onChange={handleNameChange} id={"username"} />
        Password:{" "}
        <input
          value={password}
          onChange={handlepasswordChange}
          id={"password"}
        />
        <button id={"login-button"} type="submit">
          login
        </button>
      </div>
    </form>
  );
};

const ErrorNotifcation = ({ message }) => {
  ErrorNotifcation.propTypes = {
    message: PropTypes.string,
  };
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export default App;
