// async request lib
import axios from 'axios';

export function fetchPosts() {
  return ( dispatch ) => {
    dispatch({ type: "FETCH_POSTS_PENDING"})
    axios.get("https://jsonplaceholder.typicode.com/posts")
    .then( response => {
      dispatch({ type: "FETCH_POSTS_FULLFILLED", payload: response.data })
    }).catch( err => {
      dispatch({ type: "FETCH_POSTS_REJECTED", payload: err })
    })
  }
}
