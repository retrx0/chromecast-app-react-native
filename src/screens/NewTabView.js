import React, {useContext} from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Grid from 'react-native-grid-component';
import BottomNav from '../components/BottomNav';
import SearchBar from '../components/SearchBar';
import {Context as uriContext} from '../context/SearchUriContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewTabView = ({navigation}) =>{

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@channels');
            console.log(jsonValue)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.log(e)
        }
    }
    getData();
    // if(getData() !== null){
    //     const ls = getData(); 
    //     const c = [];
    //     for(var i in ls){c.push([i, ls[i]]);}
    //     console.log(c); }else console.log("no");
    
    // if (!getData){
    //     channels = [
    //         {title: 'f2movies.to', uri: 'http://www.f2movies.to'}, 
    //         {title: 'MBC 2', uri: 'http://www.3rbcafee.com/2019/04/MBC-Max-Live.html'}, 
    //         {title: 'Dubai One', uri: 'http://www.dubaione.ae/content/dubaione/en-ae/live.html'}
    //     ];
    //     storeData(channels);
    // }else{
    //     const ls = getData();
    //     for(var i in ls)
    //         channels.push([i, ls[i]]);
    // }
    
    const channels = [
        {title: 'f2movies.to', uri: 'http://www.f2movies.to'}, 
        {title: 'MBC 2', uri: 'http://www.3rbcafee.com/2019/04/MBC-Max-Live.html'}, 
        {title: 'Dubai One', uri: 'http://www.dubaione.ae/content/dubaione/en-ae/live.html'}
    ];

    const storeData = async (list) => {
        try {
          const jsonValue = JSON.stringify(list);
          await AsyncStorage.setItem('@channels', jsonValue)
        } catch (e) {
          console.log(e)
        }
    }

    return (
        <View style = {styles.container}>
            <SearchBar 
                navigation = {navigation}
                style = {{marginHorizontal: 10}} 
            />
            <View style = {{flex: 1}}>
                <Text style = {styles.title}>Channels</Text>
                <Grid 
                    style = {styles.grid}
                    keyExtractor = {(item, id) => {item.title}}
                    renderItem={(item, id) => {
                        return (
                            <View style = {styles.item}>
                                <TouchableOpacity onPress = {() => {navigation.navigate('Browser', item.uri);}}>
                                    <Image 
                                        style = {styles.itemicon} 
                                        source = {{uri: `https://s2.googleusercontent.com/s2/favicons?domain=${item.uri}`}} 
                                    />
                                    <Text style = {{alignSelf: 'center'}}>{item.title}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                    numColums = {4}
                    data = {channels}
                />
            </View>
            <BottomNav navigation = {navigation} style = {styles.bottom}></BottomNav>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 35,
        paddingHorizontal: 20,
        margin: 10
    },
    grid: {
        flex: 1
    },
    item: {
        height: 50, width: 50, flex: 1,
        padding: 10, margin: 5, elevation: 10
    },
    itemicon: {
        height: 50, width: 50, alignSelf: 'center'
    },
    bottom: {
        alignSelf: 'flex-end',
        marginBottom: 20
    },
    castButton: {
        paddingHorizontal: 10
    }
});

export default NewTabView;