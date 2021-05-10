import { GET_ALL_USERS } from "../Actions/actionsUsers"

const initialState = {
  GET_ALL_USERS,
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
      }

    default:
      return {
        ...state,
      }
  }
}
