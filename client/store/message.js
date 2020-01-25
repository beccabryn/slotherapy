import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_MESSAGES = 'GET_MESSAGES'
const GET_SINGLE_MESSAGE = 'GET_SINGLE_MESSAGE'

/**
 * INITIAL STATE
 */
const initialState = {
  messages: [],
  message: {}
}

/**
 * ACTION CREATORS
 */
const getMessages = messages => ({type: GET_MESSAGES, messages})
const getSingleMessage = message => ({type: GET_SINGLE_MESSAGE, message})

/**
 * THUNK CREATORS
 */
export const fetchMessages = () => {
  return async dispatch => {
    const res = await axios.get('/messages')
    const action = getMessages(res.data)
    dispatch(action)
  }
}

export const fetchMessage = id => {
  return async dispatch => {
    const res = await axios.get(`/messages/${id}`)
    const action = getSingleMessage(res.data)
    dispatch(action)
  }
}

/**
 * REDUCER
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {...state, messages: action.messages}
    case GET_SINGLE_MESSAGE:
      return {...state, message: action.message}
    default:
      return state
  }
}

export default reducer
