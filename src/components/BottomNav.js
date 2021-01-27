import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {MaterialCommunityIcons, Feather, AntDesign} from '@expo/vector-icons';

const BottomNav = ({navigation}) => {
    return (
        <View style = {styles.container}>
            <TouchableOpacity><AntDesign name = 'arrowleft' size = {30}/></TouchableOpacity>
            <TouchableOpacity><AntDesign name = 'arrowright' size = {30}/></TouchableOpacity>
            <TouchableOpacity onPress = {() => navigation.navigate('Remote')}>
                <MaterialCommunityIcons name = 'remote-tv' size = {30}/>
            </TouchableOpacity>
            <TouchableOpacity><Feather name = 'cast' size = {30}/></TouchableOpacity>
            <TouchableOpacity onPress = {() => navigation.navigate('Settings')}>
                <Feather name = 'settings' size = {30}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fcfcfc',
        borderRadius: 10,
        height: 80
    }
});

export default BottomNav;
