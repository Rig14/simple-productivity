import React from 'react';
import Navbar from '../components/Navbar';
import { auth } from '../firebase';

const Account = (): JSX.Element => {
  const signout = () => {
    auth.signOut();
  };

  return (
    <div>
      <Navbar />
      <button onClick={signout} type="button">
        sign out
      </button>
    </div>
  );
};

export default Account;
