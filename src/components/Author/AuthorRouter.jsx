import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthorList from './AuthorList';
import AuthorForm from './AuthorForm';

function AuthorRouter({ match }) {
    const { path } = match;

    return (
        <Switch>
            <Route exact path={path} component={AuthorList} />
            <Route path={`${path}/add`} component={AuthorForm} />
            <Route path={`${path}/edit/:id`} component={AuthorForm} />
        </Switch>
    );
}

export default AuthorRouter;