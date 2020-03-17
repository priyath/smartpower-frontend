import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import FirebaseIcon from 'mdi-react/FirebaseIcon';
import withAuthFirebase from '../auth/withAuthFirebase';
import { useAuth0 } from '../auth/withAuth0';
import Loading from '../Loading';
import LogInForm from './LogInForm';
import GoogleAuthBtn from '../../../containers/Account/AuthBtn/googleAuthBtn';
import FacebookAuthBtn from '../../../containers/Account/AuthBtn/fbAuthBtn';

const auth0Icon = `${process.env.PUBLIC_URL}/img/auth0.svg`;
const LoginCard = ({ changeIsOpenModalFireBase }) => {
  const {
    loginWithRedirect, loading,
  } = useAuth0();
  if (loading) {
    return (<Loading loading={loading} />);
  }
  return (
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
          onSubmin
          form="log_in_form"
        />
      </div>
    </div>
  );
};

LoginCard.propTypes = {
  changeIsOpenModalFireBase: PropTypes.func.isRequired,
};

export default withAuthFirebase(LoginCard);
