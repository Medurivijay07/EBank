import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', showErrMsg: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  renderUserId = () => {
    const {userId} = this.state

    return (
      <>
        <label className="label-element" htmlFor="userId">
          User ID
        </label>
        <input
          className="input-element"
          type="text"
          placeholder="Enter User Id"
          value={userId}
          id="userId"
          onChange={this.onChangeUserId}
        />
      </>
    )
  }

  renderPin = () => {
    const {pin} = this.state

    return (
      <>
        <label className="label-element" htmlFor="pin">
          PIN
        </label>
        <input
          className="input-element"
          type="password"
          placeholder="Enter PIN"
          id="pin"
          value={pin}
          onChange={this.onChangePin}
        />
      </>
    )
  }

  render() {
    const {showErrMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-main-container">
        <div className="login-card">
          <img
            className="login-logo"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <div className="login-form">
            <h1>Welcome Back</h1>
            <form className="form-container" onSubmit={this.onSubmitForm}>
              {this.renderUserId()}
              {this.renderPin()}
              <button className="login-button" type="submit">
                Login
              </button>
              {showErrMsg && <p className="error-msg">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
