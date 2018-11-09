import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducer as reduxFormReducer } from 'redux-form'
import { sidebarReducer, authentificationReducer } from '../redux/reducers/index'

const reducer = combineReducers({
	form: reduxFormReducer, // mounted under "form",
	sidebar: sidebarReducer,
	authentification: authentificationReducer
})
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = (window.devToolsExtension
	? window.devToolsExtension()(createStoreWithMiddleware)
	: createStoreWithMiddleware)(reducer)

export default store
