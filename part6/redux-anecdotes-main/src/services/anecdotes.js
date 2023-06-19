import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}


const updateVote = async (id) => {
  const anectUrl = baseUrl+'/'+id
  const anecote = await axios.get(anectUrl)
  const updatedAnecdote = { ...anecote.data, votes: anecote.data.votes + 1 }
  const response = await axios.put(anectUrl, updatedAnecdote)
  return response.data
}
export  {getAll, createNew, updateVote}