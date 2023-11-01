import React, { useContext, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { ColorContext } from '../../contexts/ColorContext';

import { mainColor } from '../../colors/colors';
import { categories } from '../../services/availableServices';

import Category from '../components/Categories/Category';


export default function Categories() {

    const [isTheAccordionOpen, setAccordion] = useState(new Array(categories.length));

    const navigation = useNavigation();
    
    const { color } = useContext(ColorContext);
    
    const updateAccordionStatus = (index, status) => {
        const newAccordionStatus = [...isTheAccordionOpen];
        newAccordionStatus[index] = status;
        setAccordion(newAccordionStatus);
    };
    return (
        <View style={styles.container}>
            <StatusBar style='light'/>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} >
                        <Ionicons name="caret-back-circle" size={24} color={color} />
                    </TouchableOpacity>
                    <Text style={{color: color, fontWeight: 'bold', fontSize: 18}}>
                        Categorias
                    </Text>
                </View>
                <View style={styles.categoriesContainer}>
                    <View style={styles.accordion}>
                        {
                            categories.map((category, key) => (
                                    <TouchableOpacity
                                        key={`accordionItem#${key}`} 
                                        style={styles.accordionItem}
                                        onPress={() => {
                                            if(isTheAccordionOpen[key] === undefined) 
                                            updateAccordionStatus(key, true);
                                            else updateAccordionStatus(key, undefined);
                                        }}
                                    >
                                        <View style={styles.accordionHeader}>
                                            <Image source={category.cover} style={{ width: '100%', height: '100%'}}/>
                                            <LinearGradient
                                                colors={['transparent', color]}
                                                style={[StyleSheet.absoluteFillObject]}
                                            />
                                            <View 
                                                style={[styles.accordionHeaderInfo, 
                                                        StyleSheet.absoluteFillObject,
                                                        category.category.length < 30 
                                                            ? { marginTop: 105 }
                                                            : { marginTop: 85 }
                                                ]}
                                            >
                                                <Text style={styles.accordionHeaderTitle}>
                                                    {category.category}
                                                </Text>
                                                <Icon 
                                                    name={isTheAccordionOpen[key] === undefined ? 'chevron-down' : 'chevron-up'} 
                                                    size={18} 
                                                    color={'white'} 
                                                />
                                            </View>
                                        </View>
                                        { isTheAccordionOpen[key] === true &&                                       
                                            <View style={[styles.accordionBody, { backgroundColor: color }]}>
                                            {
                                                category.topics.map((topic, key) => (
                                                    <View
                                                        key={`viewTopics#${key}`} 
                                                        style={{ backgroundColor: 'white', padding: 1.5, borderRadius: 50}}
                                                    >
                                                        <Category category={topic} key={key}/>
                                                    </View>
                                                ))
                                            }
                                            </View>
                                        }
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
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
        width: '100%',
        flexDirection: 'column',
        gap: 5,
        marginTop: 35,
        marginBottom: 30
    },
    accordion: {
        flexDirection: 'column',
        gap: 20
    },
    accordionItem: {
        flexDirection: 'column',
        width: '100%',
        // backgroundColor: 'green',
    },
    accordionHeader: {
        height: 150,
        borderRadius: 10,
        overflow: 'hidden',
    },
    accordionHeaderInfo: {
        flexDirection: 'row',
        gap: 25,
        marginLeft: 20,
    },
    accordionHeaderTitle: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18,
        width: 250, 
    },
    accordionBody: {
        width: '100%',
        backgroundColor: 'grey',
        marginTop: -10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
        gap: 5
    }
});