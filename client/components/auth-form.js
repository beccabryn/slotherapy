import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import styled from 'styled-components'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Container>
      <Wrapper>
        <Form>
          <form onSubmit={handleSubmit} name={name}>
            <Auth>
              <div>
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input name="email" type="text" />
              </div>
              <div>
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input name="password" type="password" />
              </div>
              <div>
                <Submit type="submit">{displayName}</Submit>
              </div>
              {error && error.response && <div> {error.response.data} </div>}
            </Auth>
          </form>
          <Google>
            <a href="/auth/google">{displayName} with Google</a>
          </Google>
        </Form>
      </Wrapper>
    </Container>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

//CSS

const Container = styled.div`
  height: 100vh;
`

const Wrapper = styled.div`
  background-image: url(https://pbs.twimg.com/media/ECrFqQHUEAA1xZG.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  opacity: 0.7;
  min-height: 100vh;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

const Auth = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  width: 250px;
  justify-content: center;
  text-align: center;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 100;
  font-size: 25px;
  color: #636363;
  text-transform: uppercase;
  background-color: #f2f2f2;
`

const Google = styled.div`
  background-color: #f2f2f2;
  color: #636363;
  font-family: 'Josefin Sans', sans-serif;
  padding: 1em 1.5em;
  text-decoration: none;
  font-weight: 100;
  text-transform: uppercase;
  margin-block-start: 10px;
  font-size: 12px;
`

const Submit = styled.button`
  font-size: 15px;
  background-color: white;
  border: none;
  color: #636363;
  padding: 15px 32px;
  text-transform: uppercase;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 100;
`
