import { combineReducers } from "redux";
import People from "./people";
import Posts from "./posts";
import AllPosts from "./allPosts";

export default combineReducers({
  People,
  Posts,
  AllPosts,
});
