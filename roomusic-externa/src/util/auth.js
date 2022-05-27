import { Alert } from 'react-native';
import React, { useEffect, useState } from 'react';

export const useLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [data, setData] = useState(null);  
  const submit = () => {
    const nextErrors = {};
    if (email.length === 0) {
      nextErrors.email = 'This field is required.';
    }
    if (password.length === 0) {
      nextErrors.password = 'This field is required.';
    }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return null;
    }else{
      console.log("Correcte! Retorna 1");
      return 1;
    }
  };
  if(submit===1){
    console.log("correcte x2!");
  }

  return {
    submit,
    errors,
    email,
    setEmail,
    password,
    setPassword,
  };
};
