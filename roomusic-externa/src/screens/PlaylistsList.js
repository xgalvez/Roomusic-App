import { ListItem, ListSeparator } from '../components/Llista';
import { styles, url } from './Login';

import React, { useEffect, useState } from 'react';
import { StyleSheet,FlatList, View, Alert } from 'react-native';


export const PlaylistsList = ({route, navigation}) => {
  const [data, setData] = useState(null);
  const {sessionToken} = route.params;
  const [queueIndex, setQueueIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url+':3000/api/v1/playlist/getall', {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json; charset=utf-8',
          'x-access-token': sessionToken,
        },
      });
      const newData = await response.json();
      //Delete queue playlist from the response
      setQueueIndex(newData.map(( item ) => { return item.name; }).indexOf("queue"));
      newData.splice(queueIndex);

      const newData2 = newData.map(( item,ix) => {
        if(item.name !== "queue"){
          return {
            id: ix,
            name: item.name
          };
        }
        
      })
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
          onPress= {() => navigation.navigate('PlaylistSongs',{playlistName: item.name, sessionToken : sessionToken})}
        />
      )}
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
  );
};