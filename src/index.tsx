import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
// @ts-ignore
import { PersistGate } from 'redux-persist/es/integration/react';
import axios from 'axios';

import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store';
import './index.css';
import Authentication from './components/Authentication';
import App from './components/App';
import './i18n';

axios.defaults.baseURL = 'https://sso.stg.lecourt.tv/';

const { store, persistor } = configureStore();

ReactDOM.render(
    <Provider store={ store }>
        <PersistGate
            loading={<div>Loading...</div>}
            persistor={persistor}
        >
            <ConnectedRouter history={history}>
                <Switch>
                    <Redirect to="/app" from="/" exact />
                    <Route path="/app" component={App} />
                    <Route path="/authentication" component={Authentication} />
                    <Route render={() => (<div>Page not found</div>)} />
                </Switch>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
