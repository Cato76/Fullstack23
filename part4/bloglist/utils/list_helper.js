const dummy = (blogs) => {
  return 1
}


const totalAmountOfLikes = (blogs) => {

  let likes = 0
  blogs.forEach(blog => {
    likes += blog.likes
  })

  return likes
}

const favoriteBlog = (blogs) => {

  if (blogs[0] === 'undefined') {
    return undefined
  }

  let favorite = blogs[0]

  blogs.forEach(blog => {
    if (blog.likes > favorite.likes)
      favorite = blog
  })

  return favorite
}

const mostBlogs = (blogs) => {

  MostBlogsAuthor = {
    author: "",
    blogs: 0
  }

  currentAuthor = {
    author: "",
    blogs: 0
  }

  const authorsList = []

  for (i = 0; i < blogs.length; i++) {
    currentAuthor.author = blogs[i].author
    currentAuthor.blogs = 0
    if (!authorsList.includes(currentAuthor.author)) {

      for (j = 0; j < blogs.length; j++) {
        if (blogs[j].author === currentAuthor.author) {
          currentAuthor.blogs += 1
        }
      }
      if (currentAuthor.blogs >= MostBlogsAuthor.blogs) {
        MostBlogsAuthor.author = currentAuthor.author
        MostBlogsAuthor.blogs = currentAuthor.blogs
      }
      authorsList.push(currentAuthor.author)
    }
  }

  return MostBlogsAuthor
}

const mostLikes = (blogs) => {

  MostLikesAuthor = {
    author: "",
    likes: 0
  }

  currentAuthor = {
    author: "",
    likes: 0
  }

  const authorsList = []

  for (i = 0; i < blogs.length; i++) {
    currentAuthor.author = blogs[i].author
    currentAuthor.likes = 0
    if (!authorsList.includes(currentAuthor.author)) {
      for (j = 0; j < blogs.length; j++) {
        if (blogs[j].author === currentAuthor.author) {
          currentAuthor.likes += blogs[j].likes
        }
      }

      if (currentAuthor.likes >= MostLikesAuthor.likes) {
        MostLikesAuthor.author = currentAuthor.author
        MostLikesAuthor.likes = currentAuthor.likes
      }
      authorsList.push(currentAuthor.author)
    }
  }

  return MostLikesAuthor
}

module.exports = {
  dummy,
  totalAmountOfLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}