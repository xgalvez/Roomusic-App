import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';

import colors from '../constants/colors';
import { ListItem, ListSeparator } from '../components/Llista';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 20,
  },
});

const screens = [
  {
    title: 'Totes les cançons',
    subtitle: '',
    target: 'SongsList',
  },
  {
    title: 'Artistes',
    subtitle: '',
    target: 'ArtistsList',
  },
  {
    title: 'LogIn',
    subtitle: '',
    target: 'LogIn',
  },


];

export const List = ({ navigation,route }) => {
/*
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const { email, password } = route.params;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
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
      console.log(newData);
      if (newData.error) {
        console.log(newData);
        console.log("Usuari o contrasenya incorrectes");
        alert('Usuari o contrasenya incorrectes');
      }else{
  //      console.log("Token: "+newData.token);
        setToken(newData.token);
        setData(newData);
      }
    };
    fetchData();
  });
*/
  return (
    <FlatList
      style={styles.container}
      data={screens}
      keyExtractor={item => item.title}
      renderItem={({ item }) => (
        <ListItem
          title={item.title}
          subtitle={item.subtitle}
          onPress={() => navigation.navigate(item.target,{sessionToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjUyNzk3MjAwfQ.SlZ9nONbadlhUC3x1TTTqzf4eRyaR0-72t3DdxD635M'})}
        />
      )}
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
  );
};
