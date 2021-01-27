import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

const SettingsScreen = () => {
    return (
        <View>
            <Text style = {styles.header}>Settings</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        paddingHorizontal: 20,
        margin: 10
    }
});

export default SettingsScreen;