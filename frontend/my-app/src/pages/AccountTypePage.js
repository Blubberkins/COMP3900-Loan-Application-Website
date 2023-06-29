import React, { useState } from 'react';

import {useNavigate } from 'react-router-dom';

import AccountType from '../components/AccountType';
import { LoginLink } from '../components/LoginLink';

const AccountTypePage = () => {

  return (
    <div>
        <LoginLink></LoginLink>
        <AccountType></AccountType>
    </div>

  );
};

export default AccountTypePage;
