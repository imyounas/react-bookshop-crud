import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import AuthorEditor from "./components/Author/AuthorEditor";
import BookRouter from "./components/Book/BookRouter";
import Home from "./components/Home";





const AppRouter = () => {
  return (
    <div>
      <Header></Header>
      <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
        <Route path="/authors" component={AuthorEditor} />
        <Route path="/books" component={BookRouter} />
        {/* <Redirect from="*" to="/" /> */}
      </Switch>
    </div>
  );
};

export default AppRouter;
