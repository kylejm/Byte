import React, { Component } from 'react'
import firebase from './firebase'
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

class Login extends Component {
  emailTF: HTMLInputElement | undefined

  login = (e: any) => {
    e.preventDefault()

    const url = window.location.href + '/complete'
    var actionCodeSettings = {
      url: url,
      handleCodeInApp: true
    }

    const email = this.emailTF!.value
    console.log(url)

    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
      .then(function () {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
      })
      .catch(function (error) {
        // Some error occurred, you can inspect the code: error.code
      });
  }

  render() {
    return (
      <Form inline onSubmit={this.login}>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>{' '}
          <FormControl inputRef={ref => { this.emailTF = ref }} type="email" />
        </FormGroup>{' '}
        <Button type="submit">Save</Button>
      </Form>
    )
  }
}

export default Login