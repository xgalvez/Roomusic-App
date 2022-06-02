import { ListItem, ListSeparator, ArtistAlbumsListHeader } from '../components/Llista';
import { styles, url } from './Login';

import React, { useEffect, useState } from 'react';
import { FlatList,Text } from 'react-native';

export const ArtistAlbums = ({route, navigation}) => {
    const [data, setData] = useState(null);
  
    const { artistName, sessionToken } = route.params;
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(url+':3000/api/v1/db/artists-albums', {
          method: 'POST',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json; charset=utf-8',
            'x-access-token': sessionToken,
          },
          body: JSON.stringify({
            artist: artistName
          })
        });
        const newData = await response.json();
  
        const newData2 = newData.albums.map(( item,ix) => {
          return {
            id: ix,
            name: item.name,
            album_art_file: item.album_art_file,
            year: item.year,
            artist: artistName
          };
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
            title={<div>{item.name ? item.name : <>Singles</> }</div>}
            subtitle={item.year}
            onPress={() => {
              navigation.navigate('AlbumSongs', {
                albumName: item.name,
                albumArtist: item.artist,
                albumYear: item.year,
                sessionToken: sessionToken,
              });
            }}
          />
        )}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={ArtistAlbumsListHeader(artistName)}
        ListFooterComponent={ListSeparator}
      />
    );
  };