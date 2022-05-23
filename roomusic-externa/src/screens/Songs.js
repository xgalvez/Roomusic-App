import { Text } from '../components/Text';
import { ListItem, ListSeparator } from '../components/Llista';
import { styles, url } from './Login';

import Toast from 'react-native-root-toast'
import React, { useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';

export const SongsList = ({route}) => {
    const [data, setData] = useState(null);
    const {sessionToken} = route.params;
    const simpleAlertHandler = () => {
      //function to make simple alert
  //    alert('Hello I am Simple Alert');
      Alerta.alert("hola", "adeu")
    };

  //  console.log("token: "+sessionToken);
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
      fetch(url+':3000/api/v1/playlist/add-song', {
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
               
          />  
        )}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={ListSeparator}
        ListFooterComponent={ListSeparator}
      />
    );
  };
  