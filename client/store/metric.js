import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_METRIC = 'ADD_METRIC'

/**
 * INITIAL STATE
 */
const initialState = {
  mood: null,
  productivity: null,
  stress: null
}

/**
 * ACTION CREATORS
 */
const addMetric = entry => ({type: ADD_METRIC, entry})

/**
 * THUNK CREATORS
 */
export const postMetric = (userId, mood, productivity, stress) => {
  return async dispatch => {
    const res = await axios.post(`/api/metrics/${userId}`, {
      mood,
      productivity,
      stress
    })
    const action = addMetric(res.data)
    dispatch(action)
    history.push('/home')
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_METRIC:
      return action.entry
    default:
      return state
  }
}
