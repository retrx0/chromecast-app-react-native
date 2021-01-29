import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export const getChannels = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@channels');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e)
    }
}

export const storeChannels = async (list) => {
    try {
        const jsonValue = JSON.stringify(list);
        await AsyncStorage.setItem('@channels', jsonValue)
    } catch (e) {
        console.log(e)
    }
}