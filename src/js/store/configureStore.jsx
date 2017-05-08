import rootReducer from '../reducers';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : undefined
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}