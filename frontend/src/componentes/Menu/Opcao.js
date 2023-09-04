import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { colorCinza } from '../../colors/colors';

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <Text>{item.title}</Text>
    <Text>{item.title}</Text>
  </View>
);

export default function Menu() {

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

 return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '55%',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 85,
    gap: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  opcao: {
    width: '20%',
    height: '20%',
    backgroundColor: colorCinza,
    borderRadius: 15
  },
  item: {
    flex: 1,
    backgroundColor: 'lightgray',
    margin: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
});