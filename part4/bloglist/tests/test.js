const listHelper = require('../utils/list_helper')

const blogsCollection = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 13,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }]

test('dummy returns one', () => {
  const dummyblogs = []

  const result = listHelper.dummy(dummyblogs)
  expect(result).toBe(1)
})

describe("total likes", ()=>{

  test('totalAmountOflikes of multiple blogs is the correct amount', ()=>{
    const likes = listHelper.totalAmountOfLikes(blogsCollection)
    expect(likes).toBe(39)
  })
  
  test('empty array of blogs is 0', ()=>{
    const empty = []
    const likes = listHelper.totalAmountOfLikes(empty)
    expect(likes).toBe(0)
  })
  
  test('list with one blog with ten likes is ten', ()=>{
    const oneBlog = [{
      likes:10,
    }]
    const likes = listHelper.totalAmountOfLikes(oneBlog)
    expect(likes).toBe(10)
  })
})

describe('favorite', ()=>{

  test('Favorite Is The One With The Most Likes', ()=>{
    const favorite = listHelper.favoriteBlog(blogsCollection)
    const correct = blogsCollection[3]

    expect(favorite).toBe(correct)
  })

  test('Empty array should restult in undefined', ()=>{
    const blogs = []
    const favorite = listHelper.favoriteBlog(blogs)
    const correct = undefined

    expect(favorite).toBe(correct)
  })

  test('Empty array should restult in null', ()=>{
    const blogs = [{likes:0}]
    const favorite = listHelper.favoriteBlog(blogs)
    const correct = blogs[0]

    expect(favorite).toBe(correct)
  })

  test('arrey with multiple contenders returns one of them', ()=>{
    const likes = [{likes:2}, {likes:0}, {likes:2}, {likes:1}]
    const favorite = listHelper.favoriteBlog(likes)

    expect(favorite).toBe(likes[0] || likes[2])
  })
})

describe('mostBlogs', ()=>{

  test('The correct author with most blogs is returned', ()=>{
    const mostBlogs = listHelper.mostBlogs(blogsCollection)
    const correctMostBlogs = { author: "Robert C. Martin", blogs: 3}

    expect(mostBlogs).toStrictEqual(correctMostBlogs)
  })
})

describe('mostLikes', ()=>{

  test('The correct author with most likes is returned', ()=>{
    const mostLikes = listHelper.mostLikes(blogsCollection)
    const correct = { author: "Edsger W. Dijkstra", likes: 17}

    expect(mostLikes).toStrictEqual(correct)
  })
})
