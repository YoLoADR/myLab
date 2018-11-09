import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//Just search for an icon on materialdesignicons.com
import EyeIcon from 'mdi-react/EyeIcon'
import KeyVariantIcon from 'mdi-react/KeyVariantIcon'
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon'
import { Link } from 'react-router-dom'
import { signinUser, incrementAsync } from '../../../../redux/actions/authentificationActions'
import renderCheckBoxField from '../../../../components/form/CheckBox'

const FIELDS = { email: 'email', password: 'password' }

class LogInForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showPassword: false
		}

		this.showPassword = this.showPassword.bind(this)
	}
	handleSubmit = credentials => {
		console.log('credentials', credentials)
		this.props.incrementAsync()
	}

	showPassword(e) {
		e.preventDefault()
		this.setState({
			showPassword: !this.state.showPassword
		})
	}

	render() {
		//const { handleSubmit } = this.props

		return (
			<form className="form" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
				<div className="form__form-group">
					<label className="form__form-group-label">Email</label>
					<div className="form__form-group-field">
						<div className="form__form-group-icon">
							<AccountOutlineIcon />
						</div>
						<Field name="email" component="input" type="text" placeholder="Email" />
					</div>
				</div>
				<div className="form__form-group">
					<label className="form__form-group-label">Password</label>
					<div className="form__form-group-field">
						<div className="form__form-group-icon">
							<KeyVariantIcon />
						</div>
						<Field
							name="password"
							component="input"
							type={this.state.showPassword ? 'text' : 'password'}
							placeholder="Password"
						/>
						<button
							className={`form__form-group-button${this.state.showPassword ? ' active' : ''}`}
							onClick={e => this.showPassword(e)}
						>
							<EyeIcon />
						</button>
					</div>
					<div className="account__forgot-password">
						<a href="">Forgot a password?</a>
					</div>
				</div>
				<div className="form__form-group">
					<div className="form__form-group-field">
						<Field name="remember_me" component={renderCheckBoxField} label="Remember me" />
					</div>
				</div>
				<button type="submit" className="btn btn-primary account__btn account__btn--small">
					Sign In
				</button>
				<Link className="btn btn-outline-primary account__btn account__btn--small" to="/register">
					Create Account
				</Link>
			</form>
		)
	}
}

const logInForm = reduxForm({
	enableReinitialize: true,
	form: 'SigninForm' // a unique identifier for this form
})(LogInForm)

const mapStateToProps = state => {
	return {
		authentification: state.authentification
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ signinUser: signinUser, incrementAsync: incrementAsync }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(logInForm)

// const mapStateToProps = (state) => {
//     return {
//         mortality: state.mortality
//     }
// }
//  function mapDispatchToProps (dispatch) {
//     return bindActionCreators({fetchMortality:fetchMortality},dispatch)
// }

// export default connect(mapStateToProps,mapDispatchToProps)(MortalityList)

// const topTenEditForm = reduxForm({
// 	enableReinitialize: true,
// 	form: 'top_ten_edit_form'
//   })(TopTenEditForm);

//   const mapStateToProps = (state) => {
// 	return {
// 	  initialValues: state.cryptoTable.data
// 	};
//   };

//   export default connect(mapStateToProps)(topTenEditForm);
