import React, {PureComponent} from 'react';
import LogInForm from './components/LogInForm';
import {authUser} from '../../repositories/loginRepository';

class LogIn extends PureComponent {

  constructor() {
    super();
  }

  handleSubmit = async (submit) => {
    try {
      const authResponse = await authUser(submit);
      localStorage.setItem('currentUser', JSON.stringify(authResponse.data));
    } catch (e) {
      console.log(e);
      console.log('something went wrong');
    }
  }

  render() {
    return (
      <div className="account">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__head">
              <h3 className="account__title">Welcome to
                <span className="account__logo"> Smart
                <span className="account__logo-accent">POWER</span>
              </span>
              </h3>
            </div>
            <LogInForm
                onSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default LogIn;

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
