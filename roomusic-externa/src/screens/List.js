import colors from '../constants/colors';
import { ListItem, ListSeparator } from '../components/Llista';
import { styles, url } from './Login';
import { Button } from '../components/Button';

import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';

export const screens = [
  {
    title: 'All songs',
    subtitle: '',
    target: 'SongsList',
  },
  {
    title: 'Artists',
    subtitle: '',
    target: 'ArtistsList',
  },
  {
    title: 'Log Out',
    subtitle: '',
    target: 'LogIn',
  },


];

export const List = ({ navigation,route }) => {
  const { token } = route.params;
  
  JSON.stringify(token)

  return(
    <FlatList
      style={styles.container}
      data={screens}
      keyExtractor={item => item.title}
      renderItem={({ item }) => (
        <View>
          <Button  onPress={() => navigation.navigate(item.target,{sessionToken:token})}>{ item.title }</Button> 
        </View>
      )}
    />
   

  );
  /*
  return (
    <FlatList
      style={styles.container}
      data={screens}
      keyExtractor={item => item.title}
      renderItem={({ item }) => (
        <ListItem
          title={item.title}
          subtitle={item.subtitle}
          onPress={() => navigation.navigate(item.target,{sessionToken:token})}
        />
      )}
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
  );*/
};
