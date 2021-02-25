import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Main from './components/Main';
import Posts from './components/Posts';
import Post from './components/Post';
import AllPosts from './components/AllPosts';


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/user/posts" component={Posts} />
          <Route path="/posts" component={AllPosts} />
          <Route path="/post" component={Post} />
          <Redirect to={"/"} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
