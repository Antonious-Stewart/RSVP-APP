import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/Auth/authReducer';
import eventsReducer from './reducers/Events/eventsReducer';

//combine all reducers into one root reducer
const rootReducer = combineReducers({
	auth: authReducer,
	event: eventsReducer
});

//middleware
const middleware = [thunk];
// redux store with rootreducer and dev tools
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
