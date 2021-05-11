import {
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  GET_ALL_USERS_SUCCESS,
  GET_USER,
  EDIT_USER,
  DELETE_USER,
  ADD_USER,
  ADD_USER_ERROR,
  ADD_USER_SUCCESS,
  LOGOUT,
  LOGIN,
  REDIRECT,
} from "../Actions/constants"

const initialState = {
  users: [],
  loading: false,
  error: false,
  redirect: false,
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
    case GET_ALL_USERS:
      return {
        ...state,
        loading: true,
      }
    case REDIRECT:
      return {
        ...state,
        redirect: true,
      }
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        users: [...state.users, action.payload],
      }
    case ADD_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      }
    default:
      return {
        ...state,
      }
  }
}
