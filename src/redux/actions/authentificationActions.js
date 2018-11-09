import axios from 'axios'

const BASE_URL = 'http://localhost:3090'

export const SET_AUTHENTIFICATION = 'SET_AUTHENTIFICATION'

const INCREMENT_COUNTER = 'INCREMENT_COUNTER'

function increment() {
	return {
		type: INCREMENT_COUNTER
	}
}

export function incrementAsync() {
	return dispatch => {
		setTimeout(() => {
			// Yay! Can invoke sync or async actions with `dispatch`
			dispatch(increment())
		}, 1000)
	}
}

export function setAuthentification(isLoggedIn) {
	return {
		type: SET_AUTHENTIFICATION,
		payload: isLoggedIn
	}
}

export function signinUser({ email, password }) {
	console.log('data', email, password)
	return function(dispatch) {
		return axios
			.post(`${BASE_URL}/signin`, {
				email,
				password
			})
			.then(response => {
				console.log('ressponse', response)
				localStorage.setItem('token', response.data.token)
				dispatch(this.setAuthentification(true))
				//history.push('/pages')
			})
			.catch(err => {
				console.log(err)
			})
	}
}

// export function signinUser(){
// 	return function (dispatch) {
// 	   return axios(`http://api.population.io:80/1.0/countries`).then(function(response){
// 		  dispatch({type : GET_COUNTRIES,payload:response.data.countries})
// 	   }).catch(function (error) {
// 		 dispatch({type : ERROR_GET_COUNTRIES,errors:error.response.data.detail})
// 	   });
//    }
// }
