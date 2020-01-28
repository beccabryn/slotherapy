import axios from 'axios'
import history from '../history'
/**
 * ACTION TYPES
 */
const GET_ALERTS = 'GET_ALERTS'
const CREATE_ALERT = 'CREATE_ALERT'
const GET_CURR_ALERT = 'GET_CURR_ALERT'
const UPDATE_ALERT = 'UPDATE_ALERT'

/**
 * INITIAL STATE
 */
const initialState = {
  alerts: [],
  currAlert: {}
}

/**
 * ACTION CREATORS
 */
const getAllAlerts = alerts => ({type: GET_ALERTS, alerts})
const createNewAlert = alert => ({type: CREATE_ALERT, alert})
const getCurrAlert = alert => ({type: GET_CURR_ALERT, alert})
const updateAlert = alert => ({type: UPDATE_ALERT, alert})
/**
 * THUNK CREATORS
 */

export const allAlerts = id => {
  return async dispatch => {
    const res = await axios.get(`/api/alerts/user/${id}`)
    const action = getAllAlerts(res.data)
    dispatch(action)
  }
}

export const createNew = () => {
  return async dispatch => {
    const res = await axios.post(`/api/alerts/`)
    const action = createNewAlert(res.data.alert)
    dispatch(action)
    // history.push('/curralert')
    let notif = new Notification(res.data.alert.message.title, {
      body: res.data.alert.message.steps,
      icon: res.data.slotherapist.imageUrl
    })
    notif.onclick = function(e) {
      window.open(`/curralert?id=${res.data.alert.id}`)
    }
    console.log(res.data.alert)
  }
}

export const getCurr = id => {
  return async dispatch => {
    const res = await axios.get(`/api/alerts/${id}`)
    const action = getCurrAlert(res.data)
    dispatch(action)
  }
}

export const update = (id, liked, completed) => {
  return async dispatch => {
    const res = await axios.put(`/api/alerts/${id}`, {
      liked,
      completed
    })
    const action = updateAlert(res.data)
    dispatch(action)
    history.push('/home')
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALERTS:
      return {...state, alerts: action.alerts}
    case CREATE_ALERT:
      return {...state, currAlert: action.alert}
    case GET_CURR_ALERT:
      return {...state, currAlert: action.alert}
    case UPDATE_ALERT:
      return {...state, currAlert: action.alert}
    default:
      return state
  }
}
