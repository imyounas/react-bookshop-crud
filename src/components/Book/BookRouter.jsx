import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BookList from './BookList';
import BookForm from './BookForm';


function BookRouter({ match }) {
    const { path } = match;

    return (
        <Switch>
            <Route exact path={path} component={BookList} />
            <Route path={`${path}/add`} component={BookForm} />
            <Route path={`${path}/edit/:id`} component={BookForm} />
        </Switch>
    );
}

export default BookRouter;