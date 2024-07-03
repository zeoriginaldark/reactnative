import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';

const store = createStore(authReducer, applyMiddleware(thunk));

export default store;
