import { setErrors } from './errors'

const SET_USER = 'auth/setUser'
const LOGOUT_USER = 'auth/logoutUser'

export const logoutUser = () => ({ type: LOGOUT_USER })
export const setUser = (user) => ({ type: SET_USER, user })

export const authenticate = () => async (dispatch) => {
  const res = await fetch('/api/auth', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const user = await res.json()
  if (res.ok) dispatch(setUser(user))
}

export const login = (email, password) => async (dispatch) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  const user = await res.json()
  if (user.errors) {
    dispatch(setErrors(user.errors))
  } else {
    dispatch(setUser(user))
  }
}

export const logout = () => async (dispatch) => {
  const res = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (res.ok) dispatch(logoutUser())
}

export const signUp = (username, email, password) => async (dispatch) => {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
  })
  const user = await res.json()
  if (user.errors) {
    dispatch(setErrors(user.errors))
  } else {
    dispatch(setUser(user))
  }
}

export function authReducer(state = { user: null, status: false }, action) {
  switch (action.type) {
    case SET_USER: {
      const newState = { ...state }
      newState.user = action.user
      return newState
    }
    case LOGOUT_USER: {
      const newState = { ...state }
      newState.user = null
      return newState
    }
    default:
      return state
  }
}
