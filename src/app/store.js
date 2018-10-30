import {combineReducers, createStore} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import {sidebarReducer} from '../redux/reducers/index';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  sidebar: sidebarReducer
});

const store = createStore(reducer);

export default store;