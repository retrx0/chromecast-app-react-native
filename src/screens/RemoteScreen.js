import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {AntDesign, Feather} from '@expo/vector-icons'

const RemoteScreen = () => {
    return (
        <View>
            <Text style = {styles.title}>Remote</Text>
            <View style = {styles.row}>
                <View style = {styles.col}>
                    <Text style = {styles.buttonText}>Channels</Text>
                    <TouchableOpacity><AntDesign name = 'caretup' size = {80}/></TouchableOpacity>
                    <TouchableOpacity><AntDesign name = 'caretdown' size = {80}/></TouchableOpacity>
                </View>
                <View style = {styles.col}>
                    <Text style = {styles.buttonText}>Volume</Text>
                    <TouchableOpacity><AntDesign name = 'plus' size = {80}/></TouchableOpacity>
                    <TouchableOpacity><AntDesign name = 'minus' size = {80}/></TouchableOpacity>
                </View>
            </View>
            <View style = {styles.row}>
                <TouchableOpacity style = {{flexDirection: 'row'}}>
                    <Text>Edit Channel List </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        alignSelf: 'center',
        margin: 10
    },
    buttonText: {
        alignSelf: 'center',
        margin: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    col: {
        flexDirection: 'column',
        alignSelf: 'center'
    }
});

export default RemoteScreen;