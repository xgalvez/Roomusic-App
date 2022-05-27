import colors from '../constants/colors';
import { ListItem, ListSeparator } from '../components/Llista';
import { styles, url } from './Login';
import { Button } from '../components/Button';
import { TextInput } from '../components/Form';

import Toast from 'react-native-root-toast'
import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';

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
  const [keyWord, setKeyWord] = useState();
  const [data, setData] = useState(null);

  

  const postSearch = async (text) => {
    setKeyWord(text);
    console.log(keyWord);
    if(keyWord){
      const response = await fetch(url + ':3000/api/v1/db/search', {
        method: 'POST',
        headers: {
          Accept: '* /*',
          'Content-Type': 'application/json; charset=utf-8',
          'x-access-token': token
        },
        body: JSON.stringify({
          search: keyWord,
          noFiles: true
        })
      });
      const newData = await response.json();
      console.log(newData);
      setData(newData);
      navigation.navigate('Search', { sessionToken: token, data: newData });
    }
  };
  const clickEnter = (e) => {
    if (e.nativeEvent.key === 'Enter') {
      postSearch();
    }
  };

  return(
    <>   
      <SearchBar
        placeholder="Write a song/artist/album name..."
        value={keyWord}  
        onChangeText={text => setKeyWord(text)}
        onKeyPress={clickEnter}
      />
      <FlatList
        style={styles.container}
        data={screens}
        keyExtractor={item => item.title}
        renderItem={({ item }) => (
          <View>
            <Button onPress={() => navigation.navigate(item.target, { sessionToken: token })}>{item.title}</Button>
          </View>
        )} />
    </>
  );
};
