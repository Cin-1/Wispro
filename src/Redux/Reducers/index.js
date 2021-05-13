import {
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  GET_ALL_USERS_SUCCESS,
  GET_USER,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
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
  idUserToDelete: null,
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
    case GET_ALL_USERS:
      return { ...state, loading: true }
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        users: action.payload,
      }
    case REDIRECT:
      return {
        ...state,
        redirect: true,
      }
    case DELETE_USER:
      return {
        ...state,
        idUserToDelete: action.payload,
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== state.idUserToDelete),
        idUserToDelete: null,
      }

    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        users: [...state.users, action.payload],
      }
    case DELETE_USER_ERROR:
    case ADD_USER_ERROR:
    case GET_ALL_USERS_ERROR:
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
