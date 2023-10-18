import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Category({ category }) {
    return (
        <TouchableOpacity 
            style={styles.category}
            onPress={() => console.log('oi')}
        >
            <Image source={category.icon} style={{width: 50, height: 50}}/>
            <Text 
                style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 12}}
            >
                {category.topic}
            </Text>
       </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    category: {
        width: 80,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
});