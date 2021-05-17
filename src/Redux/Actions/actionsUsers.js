import {
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  GET_ALL_USERS_SUCCESS,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  ADD_USER,
  ADD_USER_ERROR,
  ADD_USER_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  REDIRECT,
} from "./constants"
import request from "../../Services/api"
import Swal from "sweetalert2"

export function LoginUser(email, pass) {
  return async (dispatch) => {
    dispatch(getUserLogin())
    try {
      const res = await request.get("/users", {
        params: { email: email, password: pass },
      })
      if (res.data.length > 0) {
        const user = res.data[0]
        delete user.password
        dispatch(getLoginSuccess(user))
      } else dispatch(getLoginError())
    } catch (err) {
      console.log(err)
      dispatch(getLoginError())
    }
  }
}

export function CreateNewUser(user) {
  return async (dispatch) => {
    dispatch(addUser())
    try {
      await request.post("/users", user)
      dispatch(addUserSuccess(user))
      Swal.fire("Usuario creado")
      dispatch(redirect())
    } catch (err) {
      console.log(err)
      dispatch(addUserErr())
    }
  }
}
export function EditUser(id, user) {
  return async (dispatch) => {
    dispatch(editUser(user))
    try {
      const res = await request.patch(`/users/${id}`, user)
      dispatch(editUserSuccess(res.data))
      Swal.fire("Successful edition")
    } catch (err) {
      console.log(err)
      dispatch(editUserErr())
    }
  }
}
export function GetAllUsers() {
  return async (dispatch) => {
    dispatch(getUsers())
    try {
      const res = await request.get("/users")
      dispatch(getUsersSuccess(res.data))
    } catch (err) {
      console.log(err)
      dispatch(getUsersError())
    }
  }
}
export function DeleteUser(id) {
  return async (dispatch) => {
    dispatch(deleteU(id))

    try {
      await request.delete(`/users/${id}`)
      dispatch(deleteSuccess())
      Swal.fire("Deleted!", "The user has been deleted.", "success")
    } catch (err) {
      console.log(err)
      dispatch(deleteError())
    }
  }
}

const deleteU = (id) => ({
  type: DELETE_USER,
  payload: id,
})
const deleteSuccess = () => ({
  type: DELETE_USER_SUCCESS,
})
const deleteError = () => ({
  type: DELETE_USER_ERROR,
})
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

const getUsersSuccess = (users) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload: users,
})
const getUsersError = () => ({
  type: GET_ALL_USERS_ERROR,
})

const editUser = () => ({
  type: EDIT_USER,
})

const editUserSuccess = (user) => ({
  type: EDIT_USER_SUCCESS,
  payload: user,
})

const editUserErr = () => ({
  type: EDIT_USER_ERROR,
})
const getUserLogin = () => ({
  type: LOGIN,
})

const getLoginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
})
const getLoginError = () => ({
  type: LOGIN_ERROR,
})
