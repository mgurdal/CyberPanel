const posts = ( state={
    fetching: false,
    fetched: false,
    error: null,
    data: [
    ]
  }, action ) => {
  switch (action.type) {
    case "FETCH_POSTS_PENDING":
      return {
        ...state,
        fetched: false,
        fetching: true
      }
    case "FETCH_POSTS_FULLFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload
      }
    case "FETCH_POSTS_REJECTED":
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload
      }
    default:
      return state;
  }
}

export default posts;
