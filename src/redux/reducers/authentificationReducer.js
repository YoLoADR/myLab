import { SET_AUTHENTIFICATION } from '../actions/authentificationActions'

const initialState = {
	isLoggedIn: false
}

export default function authentificationReducer(state = initialState, action) {
	switch (action.type) {
		case SET_AUTHENTIFICATION:
			return {
				isLoggedIn: action.payload
			}
		default:
			return state
	}
}
