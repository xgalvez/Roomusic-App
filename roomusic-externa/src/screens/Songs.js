import { Text } from '../components/Text'; 
import { ListItem, ListSeparator } from '../components/Llista';
import { styles, url } from './Login';

import Toast from 'react-native-root-toast'
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

 
export const SongsList = ({route}) => {
  const [data, setData] = useState(null);
  const {sessionToken} = route.params;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url+':3000/api/v1/db/songs', {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json; charset=utf-8',
          'x-access-token': sessionToken,
        },
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
      'x-access-token': sessionToken
      },
      body: JSON.stringify({playlist: "queue", song: filepath} )
    })
    let toast = Toast.show('Song added to queue!', {
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
        subtitle={<Text> {item.metadata.artist ? item.metadata.artist : <Text>Artist</Text>}, {item.metadata.year ? item.metadata.year : <Text>Year</Text>}</Text>}
        onPress={() => addToQueue(item.filepath)} />    
      )}
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
  );
};
  
