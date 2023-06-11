import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

const blog = {
  'title': 'Blog title',
  'author': 'Blog author',
  'url': 'Blog url',
  'likes': 0,
  'user':{
    'name':'name',
    'username':'username'
  }
}

const blogUser = {
  'username': 'username'
}


test('renders blog title -5.13', async () => {

  render(<Blog blog={blog} user={blogUser} />)

  const title = screen.getByText('Blog title')
  expect(title).toBeDefined()

  const url = screen.queryByText('Blog url')
  expect(url).toBeNull()
})

test('show more -button shows more :) -5.14', async () => {

  render(<Blog blog={blog} user={blogUser} />)

  const user = userEvent.setup()
  const button = screen.getByText('show more')
  await user.click(button)


  screen.getByText(blog.title, { exact: false })
  screen.getByText(blog.author, { exact: false })
  screen.getByText(blog.url, { exact: false })
  screen.getByText(blog.likes, { exact: false })
  screen.getByText(blog.user.name, { exact: false })

})

test('ensures that if the like button is clicked twice, the event handler the component received as props is called twice -test -5.15',
  async () => {

    const mockHandler = jest.fn()

    render(<Blog blog={blog} user={blogUser} updateLikes={mockHandler} />)

    const user = userEvent.setup()
    const showMore = screen.getByText('show more')
    await user.click(showMore)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)



  })