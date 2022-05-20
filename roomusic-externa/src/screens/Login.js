import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import colors from '../constants/colors'
import QRCodeImage from '../components/QR';
import { Button } from '../components/Button';
import { TextInput } from '../components/Form';
import { useLogin } from '../util/auth';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
    textAlign: 'center',
  }
});
export const url = "http://192.168.1.64";  
//export const url = "http://172.20.10.4";

export const FormDemo = ({navigation}) => {
  const [QRurl, setQRUrl] = useState();
  const [optionsForImageType, setOptionsForImageType] = useState();

  function generateQRCode(){
    let website = url+":19006";
    console.log(website);
    setQRUrl(website)

    setOptionsForImageType({
      type: "image/png",
      quality: 1,
      level: 'H',
      margin: 10,
      scale: 8,
      width: 256,
      color: {
        dark: '#5868bfff',
        light: '#ffffffff',
      }
    });
  }

  const { submit, errors, email, setEmail, password, setPassword } = useLogin();

  const click = () => {
    {submit() === 1 ? navigation.push('App',{email:email,password:password}) /*logIn(email,password)*/ : console.log("no pots entrar") };
  } 
  return (
    <View style={styles.container}>
      <TextInput
        label="Email Address"
        placeholder="Enter your email..."
        value={email}
        onChangeText={text => setEmail(text)}
        errorText={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        placeholder="Enter your password..."
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        errorText={errors.password}
        autoCapitalize="none"
      />
      <View style={styles.container}>
      <Button position='10dp' onPress={click}>Sign In</Button> 
      <Button onPress={(generateQRCode)}>Generate QR</Button> 
      </View>
      <div>
        {url && optionsForImageType ?
          <>
            <QRCodeImage url = {QRurl} options={optionsForImageType}/>
          </>
          : null
        }
      </div>
    </View>
    
  );          // <Button onPress={submit}>Sign In</Button> 
  
}








/*
export function logIn(email,password) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
//          Accept: '* /*',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      });
      const newData = await response.json();
      console.log(newData);
      setData(newData);
    };
    fetchData();
  });
    
  return "";
}


(  
  <View style={styles.container}>
    <Button onPress={() => Alert.alert('you pressed the default button')}>
      Default Button
    </Button>
    <Button
      type="outline"
      onPress={() => Alert.alert('you pressed the outline button')}
    >
      Outline Button
    </Button>
  </View>
);
*/
