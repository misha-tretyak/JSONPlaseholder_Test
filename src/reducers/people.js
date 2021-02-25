const initialState = [];

export default function people(state = initialState, action) {
  if (action.type === "PEOPLE") {
    return action.payload;
  }
  return state;
}
