import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { ColorContext } from '../../../contexts/ColorContext';
import { useNavigation } from '@react-navigation/native';

export default function Category({ category }) {

    const navigation = useNavigation();

    const { color } = useContext(ColorContext);

    return (
        <TouchableOpacity
            style={[styles.category, { backgroundColor: color }]}
            onPress={() => {
                navigation.navigate('SearchResults', { initialSearch: category.topic, mode: 'Category' })
            }}
        >
            <Image 
                source={category.icon} 
                style={{ width: 20, height: 20 }}
            />
            <Text 
                style={{textAlign: 'center', 
                            color: 'white', 
                            fontWeight: 'bold', 
                            fontSize: 12
                }}
            >
                {category.topic}
            </Text>
       </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    category: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        flexDirection: 'row',
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 50 
    }
});