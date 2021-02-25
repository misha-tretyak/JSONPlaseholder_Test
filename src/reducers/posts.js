const initialState = [];

export default function Posts(state = initialState, action) {
  if (action.type === "POSTS") {
    return action.payload;
  }
  return state;
}
