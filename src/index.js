import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import bugerBuilderReducer from './store/reducers/burgerBuilder';
import order from './store/reducers/order'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder: bugerBuilderReducer,
    order: order
});

const reduxStore = createStore(rootReducer/* preloadedState, */
    , composeEnhancers( applyMiddleware(thunk)
));

const app = (
            <Provider store={reduxStore}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
            );


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
