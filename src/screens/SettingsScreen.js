import React, {useState} from 'react'
import { View, StyleSheet, Text, Switch, TouchableOpacity } from 'react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { useTheme, DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import {MaterialIcons, Feather, AntDesign} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View theme = {scheme === 'dark' ? 'dark' : 'light'} style = {styles.container}>
            <Text style = {{
                color: colors.text, fontSize: 35, paddingHorizontal: 10, margin: 10
                }}>Settings</Text>
            <Text style = {[{color: colors.text}, styles.categoryText]}>Appearance</Text>
            <View style = {[styles.row, {backgroundColor: colors.card}]}>
                <Text style = {[styles.settingsItemText, {color: colors.text}]}>Darkmode</Text>
                <Switch style = {styles.settingsSwitch} value = {isEnabled} onValueChange = {toggleSwitch}/>
            </View>
            <Text style = {[{color: colors.text}, styles.categoryText]}>Channels</Text>
            <TouchableOpacity onPress = {() => AsyncStorage.clear()} style = {[styles.row, {backgroundColor: colors.card}]}>
                <Text style = {[styles.settingsItemText, {color: colors.text}]}>Clear Channels</Text>
                <MaterialIcons name = 'clear-all' size = {35} style = {[{color: colors.text}, styles.settingsIcon]}/>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.row, {backgroundColor: colors.card}]}>
                <Text style = {[styles.settingsItemText, {color: colors.text}]}>Edit Channels</Text>
                <MaterialIcons name = 'edit' size = {35} style = {[{color: colors.text}, styles.settingsIcon]}/>
            </TouchableOpacity>
            <Text style = {[{color: colors.text}, styles.categoryText]}>Browser</Text>
            <TouchableOpacity style = {[styles.row, {backgroundColor: colors.card}]}>
                <Text style = {[styles.settingsItemText, {color: colors.text}]}>Clear Cache</Text>
                <MaterialIcons name = 'clear' size = {35} style = {[{color: colors.text}, styles.settingsIcon]}/>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.row, {backgroundColor: colors.card}]}>
                <Text style = {[styles.settingsItemText, {color: colors.text}]}>Clear History</Text>
                <MaterialIcons name = 'history' size = {35} style = {[{color: colors.text}, styles.settingsIcon]}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    categoryText: {
        padding: 10,
        margin: 10,
        fontSize: 20
    },
    settingsItemText: {
        padding: 10, fontSize: 18, justifyContent: 'flex-start'
    },
    settingsSwitch: {
        justifyContent:'flex-end',
        margin: 5
    },
    settingsIcon: {
        paddingHorizontal: 10,
        alignSelf: 'center'
    }
});

export default SettingsScreen;