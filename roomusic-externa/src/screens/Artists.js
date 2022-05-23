import { ListItem, ListSeparator } from '../components/Llista';
import { styles, url } from './Login';

import React, { useEffect, useState } from 'react';
import { StyleSheet,FlatList, View, Alert } from 'react-native';


export const ArtistsList = ({route, navigation}) => {
  const [data, setData] = useState(null);
  const {sessionToken} = route.params;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url+':3000/api/v1/db/artists', {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json; charset=utf-8',
          'x-access-token': sessionToken,
 /*         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1ZXN0IiwiaWF0IjoxNjUxMDcxMTUwfQ.OyEwf_Jdyd0rCPDsCat6U_47fzGJC7-crRA57fzfcjs',*/
        },
      });
      const newData = await response.json();
     // console.log(newData);
      const newData2 = newData.artists.map(( item,ix) => {
        return {
          id: ix,
          name: item
        };
      })
    //  console.log(newData2);
      setData(newData2);
    };
    fetchData();
  });

  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ListItem
          title={item.name}
          onPress= {() => navigation.navigate('ArtistAlbums',{artistName: item.name, sessionToken : sessionToken})}
        />
      )}
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
  );
};