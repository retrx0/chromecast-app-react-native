import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default async () => {
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@channels');
            console.log(jsonValue)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.log(e)
        }
    }

    const storeData = async (list) => {
        try {
          const jsonValue = JSON.stringify(list);
          await AsyncStorage.setItem('@channels', jsonValue)
        } catch (e) {
          console.log(e)
        }
    }

    return {storeData: () => storeData(), getData: () => getData()};
}