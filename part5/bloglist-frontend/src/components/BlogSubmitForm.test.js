import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogSubmitForm from './BlogSubmitForm'


test('calls the event handler with the right details when a new blog is created', async () => {
  const createBlog = jest.fn()
  render(<BlogSubmitForm submitBlog={createBlog} />)
  const user = userEvent.setup()

  const titleField = screen.getByPlaceholderText('write title here')
  const authorField = screen.getByPlaceholderText('write author here')
  const urlField = screen.getByPlaceholderText('write url here')


  await user.type(titleField, 'Blog title')
  await user.type(authorField, 'Blog author')
  await user.type(urlField, 'Blog url')

  const create = screen.getByText('create')
  await user.click(create)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('Blog title')
  expect(createBlog.mock.calls[0][0].author).toBe('Blog author')
  expect(createBlog.mock.calls[0][0].url).toBe('Blog url')

})
