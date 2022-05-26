import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { List } from '../screens/List';
import { FormDemo } from '../screens/Login';
import { SongsList }  from '../screens/Songs';
import { ArtistsList } from '../screens/Artists';
import { ArtistAlbums } from '../screens/ArtistAlbums';
import { AlbumSongs } from '../screens/AlbumSongs';
import colors from '../constants/colors'; 
import { styles } from '../screens/Login';
import { RootSiblingParent } from 'react-native-root-siblings';
import { color } from 'jimp';


const MainStack = createStackNavigator();

export const Main = () => (
  <RootSiblingParent>
    <MainStack.Navigator>
      <MainStack.Group
        screenOptions={{
          title: 'Roomusic',
          headerStyle: { 
            backgroundColor: colors.headerBackground,
            borderBottomWidth: '3px',
            borderBottomColor: colors.border
          },
          headerTintColor: colors.white,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
          
        }}
      >
        <MainStack.Screen name="LogIn" component={FormDemo} />
        <MainStack.Screen name="App" component={List} />
        <MainStack.Screen name="SongsList" component={SongsList} />
        <MainStack.Screen name="ArtistsList" component={ArtistsList}/>
        <MainStack.Screen name="ArtistAlbums" component={ArtistAlbums}/>
        <MainStack.Screen name="AlbumSongs" component={AlbumSongs}/>
      </MainStack.Group>
    </MainStack.Navigator>
  </RootSiblingParent>
);
