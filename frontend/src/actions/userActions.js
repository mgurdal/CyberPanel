// async request lib
import axios from 'axios';

export function fetchUsers() {
  return ( dispatch ) => {
    dispatch({ type: "FETCH_USERS_PENDING"})
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then( response => {
      dispatch({ type: "FETCH_USERS_FULLFILLED", payload: response.data })
    }).catch( err => {
      dispatch({ type: "FETCH_USERS_REJECTED", payload: err })
    })
  }
}

export function selectUsers(users) {
  return ( dispatch ) => {
    dispatch({
      type: "SET_SELECTED_USERS",
      payload: users
    })
  }
}
