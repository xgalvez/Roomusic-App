import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from './Text';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    backgroundColor: colors.blue,
    textAlign: 'center',
    
  },
  titleText: {
    fontWeight: 'bold',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export const ListItem = ({ title, subtitle, onPress = () => null }) => {
  const rowStyles = [styles.row];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={rowStyles}>
        <Text style={styles.titleText}>{title}</Text>
        <Text>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const ListSeparator = () => <View style={styles.separator} />;

export const ArtistAlbumsListHeader = (name) => <><Text style={styles.headerTitleText}>{name}: Albums {"\n"} </Text> <View style={styles.separator} /></>;
export const AlbumSongsListHeader = (name) => <><Text style={styles.headerTitleText}>{name}: Songs {"\n"}   </Text> <View style={styles.separator} /></>;
