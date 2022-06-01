
import { ListItem, ListSeparator } from '../components/Llista';
import { styles, url } from './Login';

import Toast from 'react-native-root-toast'
import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';


export const Search = ({route, navigation}) => {
    const {data, sessionToken} = route.params;

    const dataSongs = data.title.map(( item,ix) => {
        return {
        id: ix,
        filepath: item.filepath,
        name: item.name
        };
      })
    const dataAlbums = data.albums.map(( item,ix) => {
        return {
            id: ix,
            name: item.name,
        };
    })
    const dataArtists = data.artists.map(( item,ix) => {
        return {
            id: ix,
            name: item.name,
        };
    })
    
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
  
    return(
        
        <View style={styles.flexContainer}>             
          {dataSongs ? <FlatList
            style={styles.container}
            data={data.title}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ListItem
                title={item.name}
                onPress= {() => addToQueue(item.filepath)}
              />
            )}
            ItemSeparatorComponent={ListSeparator}
            ListHeaderComponent={<Text>Songs</Text>}
            
          /> : <Text>No songs</Text>}
          {dataArtists ? <FlatList
            style={styles.container}
            data={data.artists}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ListItem
                title={item.name}
                onPress= {() => navigation.navigate('ArtistAlbums',{artistName: item.name, sessionToken : sessionToken})}
              />
            )}
            ItemSeparatorComponent={ListSeparator}
            ListHeaderComponent={<Text>Artists</Text>}
          /> : <Text>No artists</Text>}
          {dataAlbums ? <FlatList
            style={styles.container}
            data={data.albums}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ListItem
                title={item.name}
                onPress= {() => {
                    navigation.navigate('AlbumSongs', {
                      albumName: item.name,
                      sessionToken: sessionToken,
                    });
                  }}
              />
            )}
            ItemSeparatorComponent={ListSeparator}
            ListHeaderComponent={<Text>Albums</Text>}
          /> : <Text>No albums</Text>}    
      </View>
      );
  };
  