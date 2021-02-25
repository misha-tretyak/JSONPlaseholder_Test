const initialState = [];

export default function AllPosts(state = initialState, action) {
  if (action.type === "ALL_POSTS") {
    return action.payload;
  }
  return state;
}
