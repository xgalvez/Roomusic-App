import { StyleSheet,FlatList, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ListItem, ListSeparator } from '../components/Llista';
import Toast from 'react-native-root-toast';

import colors from '../constants/colors';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { TextInput } from '../components/Form';
import { useLogin } from '../util/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
    textAlign: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'211px',
    height:'10px',
    textAlign: 'center',
    alignSelf:'center'

  },
});
//const url = "http://192.168.1.64:3000";  
const url = "http://172.20.10.4:3000";


export const SongsList = ({route}) => {
  const [data, setData] = useState(null);
  const {sessionToken} = route.params;
//  console.log("token: "+sessionToken);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url+'/api/v1/db/songs', {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json; charset=utf-8',
          'x-access-token': sessionToken,
        },
      });
      const newData = await response.json();
//    console.log("1: "+JSON.stringify(newData));
      const newData2 = newData.map(( item,ix) => {
        return {
        id: ix,
         filepath: item.filepath,
         metadata: item.metadata
        };
      })
 //     console.log(newData2);
      setData(newData2);
    };
    fetchData();
  });

  function doFetch(filepath){
    console.log("fer fetch");
    fetch(url+'/api/v1/playlist/add-song', {
      method: 'POST',
      headers: {
      Accept: '*/*',
      'Content-Type': 'application/json; charset=utf-8',
      'x-access-token': sessionToken,
      /*'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1ZXN0IiwiaWF0IjoxNjUxMDcxMTUwfQ.OyEwf_Jdyd0rCPDsCat6U_47fzGJC7-crRA57fzfcjs',*/
    },
    body: JSON.stringify({playlist: "queue", song: filepath} )
  })
  let toast = Toast.show('Has afegit la cançó a la cua!', {
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
          subtitle={<Text> {item.metadata.artist ? item.metadata.artist : <Text>No hi ha artista</Text> }, {item.metadata.year ? item.metadata.year: <Text>No sabem l'any</Text> }</Text>}
          onPress= {()=>doFetch(item.filepath)}
          //   onPress= {()=> addToQueue(item.filepath)}
        />  
      )}
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
  );
};

export const ArtistsList = ({route, navigation}) => {
  const [data, setData] = useState(null);
  const {sessionToken} = route.params;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url+'/api/api/v1/db/artists', {
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

export const ArtistAlbums = ({route, navigation}) => {
  const [data, setData] = useState(null);

  const { artistName, sessionToken } = route.params;
  console.log("Artista" + artistName);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url+'/api/api/v1/db/artists-albums', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json; charset=utf-8',
          'x-access-token': sessionToken,
/*          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1ZXN0IiwiaWF0IjoxNjUxMDcxMTUwfQ.OyEwf_Jdyd0rCPDsCat6U_47fzGJC7-crRA57fzfcjs',*/
        },
        body: JSON.stringify({
          artist: artistName
        })
      });
      const newData = await response.json();
    //  console.log(JSON.stringify(newData));

      const newData2 = newData.albums.map(( item,ix) => {
        return {
          id: ix,
          name: item.name,
          album_art_file: item.album_art_file,
          year: item.year,
          artist: artistName
        };
      })
  //    console.log(newData);
  //    console.log(newData2);
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
     //     title={item.name}
          title={<div>{item.name ? item.name : <Text>Singles</Text> }</div>}
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
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
  );
};

export const AlbumSongs = ({route}) => {
  const [data, setData] = useState(null);

  const { albumName, albumArtist, albumYear, sessionToken } = route.params;
  console.log("Album: " + albumName+", Artist: "+albumArtist+", Year: "+albumYear);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url+'/api/api/v1/db/album-songs', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json; charset=utf-8',
          'x-access-token': sessionToken,
/*          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1ZXN0IiwiaWF0IjoxNjUxMDcxMTUwfQ.OyEwf_Jdyd0rCPDsCat6U_47fzGJC7-crRA57fzfcjs',*/
        },
        body: JSON.stringify({
          album: albumName,
          artist: albumArtist, 
          year: albumYear
        })
      });
      const newData = await response.json();
  //    console.log(JSON.stringify(newData));

      const newData2 = newData.map(( item,ix) => {
        return {
          id: ix,
          filepath: item.filepath,
          metadata: item.metadata
        };
      })
  //    console.log(newData2);
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
          title={item.metadata.title}
          subtitle={item.metadata.year}
          onPress= {()=>{ fetch(url+'/api/api/v1/playlist/add-song', {
            method: 'POST',
            headers: {
            Accept: '*/*',
            'Content-Type': 'application/json; charset=utf-8',
            'x-access-token': sessionToken,
            /*'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1ZXN0IiwiaWF0IjoxNjUxMDcxMTUwfQ.OyEwf_Jdyd0rCPDsCat6U_47fzGJC7-crRA57fzfcjs',*/
            },
            body: JSON.stringify({playlist: "queue", song: item.filepath} )
          })} }
   //       onPress={() => navigation.push('SongsList',{albumName: item.name})} Aquí buscariem les cançons de lartista
        />
      )}
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
  );
};

export const FormDemo = ({navigation}) => {
  const { submit, errors, email, setEmail, password, setPassword } = useLogin();

  const click = () => {

    
    {submit() === 1 ? navigation.push('App',{email:email,password:password}) /*logIn(email,password)*/ : console.log("no pots entrar") };
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
      <Button position='10dp' onPress={click}>Sign In</Button> 
      <Button onPress={click}>Register</Button> 
      </View>
    </View>
  );          // <Button onPress={submit}>Sign In</Button> 
}

/*
export function logIn(email,password) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
//          Accept: '* /*',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      });
      const newData = await response.json();
      console.log(newData);
      setData(newData);
    };
    fetchData();
  });
    
  return "";
}


(  
  <View style={styles.container}>
    <Button onPress={() => Alert.alert('you pressed the default button')}>
      Default Button
    </Button>
    <Button
      type="outline"
      onPress={() => Alert.alert('you pressed the outline button')}
    >
      Outline Button
    </Button>
  </View>
);
*/
