import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SLOTHERAPISTS = 'GET_SLOTHERAPISTS'
const GET_SINGLE_SLOTHERAPIST = 'GET_SINGLE_SLOTHERAPIST'
const GET_CURR_SLOTH = 'GET_CURR_SLOTH'
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
const getCurrSloth = slotherapist => ({type: GET_CURR_SLOTH, slotherapist})

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

export const fetchSlotherapist = id => {
  return async dispatch => {
    const res = await axios.get(`/api/slotherapists/${id}`)
    const action = getSingleSlotherapist(res.data)
    dispatch(action)
  }
}

export const fetchCurrSloth = id => {
  return async dispatch => {
    const res = await axios.get(`/api/slotherapists/users/${id}`)
    const action = getCurrSloth(res.data)
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
    case GET_CURR_SLOTH:
      return {...state, slotherapist: action.slotherapist}
    default:
      return state
  }
}

export default reducer
