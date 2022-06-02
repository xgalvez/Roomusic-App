import { ListItem, ListSeparator } from '../components/Llista';
import { styles, url } from './Login';

import Toast from 'react-native-root-toast';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

export const PlaylistSongs = ({route}) => {
    const [data, setData] = useState(null);
  
    const { playlistName, sessionToken } = route.params;
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(url+':3000/api/v1/playlist/load', {
          method: 'POST',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json; charset=utf-8',
            'x-access-token': sessionToken,
          },
          body: JSON.stringify({
            playlistname: playlistName
          })
        });
        const newData = await response.json();
  
        const newData2 = newData.map(( item,ix) => {
          return {
            id: ix,
            filepath: item.filepath,
            metadata: item.metadata
          };
        })
        setData(newData2);
      };
      fetchData();
    });

    function addToQueue(filepath){
      fetch(url+':3000/api/v1/playlist/add-song', {
        method: 'POST',
        headers: {
        Accept: '*/*',
        'Content-Type': 'application/json; charset=utf-8',
        'x-access-token': sessionToken,
      },
      body: JSON.stringify({playlist: "queue", song: filepath} )
    })
    Toast.show('Song added to queue!', {
      duration: Toast.durations.LONG,
    });
    }
  
    return (
      <FlatList
        style={styles.container}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem
            title={item.metadata.title}
            subtitle={item.metadata.year}
            onPress={()=> addToQueue(item.filepath)}
          />
        )}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={ListSeparator}
        ListFooterComponent={ListSeparator}
      />
    );
  };