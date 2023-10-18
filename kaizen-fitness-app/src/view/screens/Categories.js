import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { ColorContext } from '../../contexts/ColorContext';

import { mainColor } from '../../colors/colors';
import { categories } from '../../services/availableServices';
import Category from '../components/Categories/Category';
import { useNavigation } from '@react-navigation/native';

export default function Categories() {

    const navigation = useNavigation();

    const { color } = useContext(ColorContext);

    return (
        <View style={styles.container}>
            <StatusBar style='light'/>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('LookingForEvents')} >
                    <Ionicons name="caret-back-circle" size={24} color={color} />
                </TouchableOpacity>
                <Text style={{color: color, fontWeight: 'bold', fontSize: 18}}>
                  Categorias
                </Text>
            </View>
            <View style={styles.categoriesContainer}>
                {
                  categories.map((category) => (
                      <Category category={category}/>
                  ))
                }
            </View>
        </View>
    );
}

const styles =  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: mainColor,
      paddingLeft: '8%',
      paddingRight: '8%',
    },
    header: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    categoriesContainer: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 5
    },
});