import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SLOTHERAPISTS = 'GET_SLOTHERAPISTS'
const GET_SINGLE_SLOTHERAPIST = 'GET_SINGLE_SLOTHERAPIST'

/**
 * INITIAL STATE
 */
const initialState = {
  slotherapists: [],
  slotherapist: {}
}

/**
 * ACTION CREATORS
 */
const getSlotherapists = slotherapists => ({
  type: GET_SLOTHERAPISTS,
  slotherapists
})
const getSingleSlotherapist = slotherapist => ({
  type: GET_SINGLE_SLOTHERAPIST,
  slotherapist
})

/**
 * THUNK CREATORS
 */
export const fetchSlotherapists = () => {
  return async dispatch => {
    const res = await axios.get('/api/slotherapists')
    const action = getSlotherapists(res.data)
    dispatch(action)
  }
}

export const fetchMessage = id => {
  return async dispatch => {
    const res = await axios.get(`/api/slotherapists/${id}`)
    const action = getSingleSlotherapist(res.data)
    dispatch(action)
  }
}

/**
 * REDUCER
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SLOTHERAPISTS:
      return {...state, slotherapists: action.slotherapists}
    case GET_SINGLE_SLOTHERAPIST:
      return {...state, slotherapist: action.slotherapist}
    default:
      return state
  }
}

export default reducer
