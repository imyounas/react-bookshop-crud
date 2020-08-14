import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import AuthorRouter from "./components/Author/AuthorRouter";
import BookRouter from "./components/Book/BookRouter";
import Home from "./components/Home";
import NotFound from "./components/NotFound"





const AppRouter = () => {
  return (
    <div>
      <Header></Header>
      <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
        <Route path="/authors" component={AuthorRouter} />
        <Route path="/books" component={BookRouter} />
        <Route path="" component={NotFound} />
        <Route path="*" component={NotFound} />
        <Route component={NotFound} />
        {/* <Redirect from="*" to="/" /> */}
      </Switch>
    </div>
  );
};

export default AppRouter;
