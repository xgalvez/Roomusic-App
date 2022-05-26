
import colors from '../constants/colors'
import QRCodeImage from '../components/QR';
import { Button } from '../components/Button';
import { TextInput } from '../components/Form';
import { useLogin } from '../util/auth';

import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
    textAlign: 'center',
  },
  header: {
    headerTitle: "Roomusic",
    headerStyle: { backgroundColor: colors.headerBackground },
    headerTintColor: colors.white,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 25,
    }
  }
});
export const url = "http://192.168.1.64";  
//export const url = "http://172.20.10.4";

export const FormDemo = ({navigation}) => {

  const { submit, errors, email, setEmail, password, setPassword } = useLogin();

  const handleLogin = async () => {

    if(submit() === 1){
      const response = await fetch(url + ':3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          Accept: '* /*',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      });

      const newData = await response.json();
      if (newData.error) {
        alert('Incorrect username or password.');
      }else{
        navigation.push('App',{token:newData.token});
      }
    }
    
  }

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
      <Button position='10dp' onPress={ handleLogin}>Sign In</Button> 
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
  );        
  

}
