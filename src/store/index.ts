import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import CreateSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/root";
import {customerReducer} from '../../src/store/user/reducers'
const appReducer = combineReducers({
    customerList: customerReducer,
});

// root reducer with when performes log out it make app state undefined and return appReducer
const rootReducer = (state: any, action: any) => {
    // Logout not needed 
    return appReducer(state, action);
}
// logger middleware to print all redux log in console
const loggerMiddleware = createLogger();
/**
 * Configures the store and returns the store object
 */
export default function configureStore(): Store<any, any> {
    const sagaMiddleware = CreateSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware,  loggerMiddleware ));
    sagaMiddleware.run(rootSaga);
    //pass this store object in route provider so can access as props in the component.
    return store;
}