const users = ( state={
    fetching: false,
    fetched: false,
    error: null,
    data: [],
    selectedUsers: []
  }, action ) => {
  switch (action.type) {
    case "FETCH_USERS_PENDING":
      return {
        ...state,
        fetched: false,
        fetching: true
      }
    case "FETCH_USERS_FULLFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload
      }
    case "FETCH_USERS_REJECTED":
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload
      }
    case "SET_SELECTED_USERS":
      return {
        ...state,
        selectedUsers: action.payload
    }
    default:
      return state;
  }
}

export default users;
