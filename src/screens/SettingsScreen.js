import React, {useState} from 'react'
import { View, StyleSheet, Text, Switch } from 'react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { useTheme, DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';

const SettingsScreen = () => {
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View theme = {scheme === 'dark' ? 'dark' : 'light'} style = {styles.container}>
            <Text style = {{
                color: colors.text, fontSize: 35, paddingHorizontal: 20, margin: 10
                }}>Settings</Text>
            <View style = {[styles.row, {backgroundColor: colors.card}]}>
                <Text style = {[styles.settingsItemText, {color: colors.text}]}>Darkmode</Text>
                <Switch style = {styles.settingsSwitch} value = {isEnabled} onValueChange = {toggleSwitch}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    settingsItemText: {
        padding: 10, fontSize: 18, justifyContent: 'flex-start'
    },
    settingsSwitch: {
        justifyContent:'flex-end',
        margin: 5
    }
});

export default SettingsScreen;