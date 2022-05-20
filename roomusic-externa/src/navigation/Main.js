import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { List } from '../screens/List';
import { FormDemo } from '../screens/Login';
import { SongsList }  from '../screens/Songs';
import { ArtistsList } from '../screens/Artists';
import { ArtistAlbums } from '../screens/ArtistAlbums';
import { AlbumSongs } from '../screens/AlbumSongs';
import colors from '../constants/colors'; 
import { RootSiblingParent } from 'react-native-root-siblings';


const MainStack = createStackNavigator();

export const Main = () => (
  <RootSiblingParent>
    <MainStack.Navigator>
      <MainStack.Screen
        name="LogIn"
        component={FormDemo}
        options={{ 
          headerTitle: "Roomusic",
          headerStyle: { backgroundColor: colors.headerBackground },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
      <MainStack.Screen
        name="App"
        component={List}
        options={{
          title: 'Roomusic',
          headerStyle: { backgroundColor: colors.headerBackground },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
      <MainStack.Screen
        name="SongsList"
        component={SongsList}
        options={{ 
          headerTitle: "Totes les cançons",
          headerStyle: { backgroundColor: colors.headerBackground },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
      <MainStack.Screen
        name="ArtistsList"
        component={ArtistsList}
        options={{ 
          headerTitle: "Llista d'artistes",
          headerStyle: { backgroundColor: colors.headerBackground },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
      <MainStack.Screen
        name="ArtistAlbums"
        component={ArtistAlbums}
        options={{ 
          headerTitle: "Llista d'àlbums de l'artista",
          headerStyle: { backgroundColor: colors.headerBackground },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
      <MainStack.Screen
        name="AlbumSongs"
        component={AlbumSongs}
        options={{ 
          headerTitle: "Cançons de l'àlbum",
          headerStyle: { backgroundColor: colors.headerBackground },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
    </MainStack.Navigator>
  </RootSiblingParent>
);
