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
  API_URL,
  LOGIN,
  LOGOUT,
  GET_SESSION_USER,
  GET_REGISTER,
  REDIRECT,
} from "./constants"
import request from "../../Services/api"
import Swal from "sweetalert2"

export const sessionLogin = {}

export function CreateNewUser(user) {
  return async (dispatch) => {
    dispatch(addUser())
    try {
      await request.post("/users", user)
      dispatch(addUserSuccess(user))
      Swal.fire("Bienvenido")
      dispatch(redirect())
    } catch (err) {
      console.log(err)
      dispatch(addUserErr())
    }
  }
}
export function GetAllUsers() {
  return async (dispatch) => {
    dispatch(getUsers())
  }
}
const addUser = () => ({
  type: ADD_USER,
})
const redirect = () => ({
  type: REDIRECT,
})

const addUserSuccess = (user) => ({
  type: ADD_USER_SUCCESS,
  payload: user,
})

const addUserErr = () => ({
  type: ADD_USER_ERROR,
})
const getUsers = () => ({
  type: GET_ALL_USERS,
})

const getUsersSuccess = () => ({
  type: GET_ALL_USERS_SUCCESS,
})
const getUsersError = () => ({
  type: GET_ALL_USERS_ERROR,
})
