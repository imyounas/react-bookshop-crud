import React from 'react';
import { Route, Switch } from 'react-router-dom';

import List from './List';
import AEForm from './AEForm';

function AuthorEditor({ match }) {
    const { path } = match;

    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/add`} component={AEForm} />
            <Route path={`${path}/edit/:id`} component={AEForm} />
        </Switch>
    );
}

export default AuthorEditor;