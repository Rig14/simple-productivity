import React from 'react';
import { useHistory } from 'react-router';
import Navbar from '../components/Navbar';
import { auth } from '../firebase';

const Account = (): JSX.Element => {
  const history = useHistory();

  const signout = () => {
    auth.signOut();
    history.goBack();
  };

  // if user is logged in and tries to view this
  // component then push user back
  if (auth.currentUser?.uid === undefined) {
    history.goBack();
  }

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <button onClick={signout} type="button">
          sign out
        </button>
      </div>
    </div>
  );
};

export default Account;
