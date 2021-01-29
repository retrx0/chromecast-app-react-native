import React, {useContext, useState, useEffect} from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Grid from 'react-native-grid-component';
import BottomNav from '../components/BottomNav';
import SearchBar from '../components/SearchBar';
import {Context as uriContext} from '../context/SearchUriContext';
import {getChannels, storeChannels} from '../hooks/useChannels';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { useTheme } from '@react-navigation/native';

const NewTabView = ({navigation}) =>{
    const [channels, setChannels] = useState([])
    useEffect(() => {
        const chans = getChannels();
        chans.then((data) => {
            if(data != null){
                setChannels(data)
            }else {
                cha = [
                    {title: 'f2movies.to', uri: 'http://www.f2movies.to', video_url: ''}, 
                    {title: 'MBC 2', uri: 'http://www.3rbcafee.com/2019/04/MBC-Max-Live.html', video_url: ''}, 
                    {title: 'Dubai One', uri: 'http://www.dubaione.ae/content/dubaione/en-ae/live.html', video_url: ''},
                    {title: 'Youtube', uri: 'http://www.youtube.com', video_url: ''}
                ]
                storeChannels(cha);
            }
        })
    }, [])
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
    // channels = [
    //     {title: 'f2movies.to', uri: 'http://www.f2movies.to', video_url: ''}, 
    //     {title: 'MBC 2', uri: 'http://www.3rbcafee.com/2019/04/MBC-Max-Live.html', video_url: ''}, 
    //     {title: 'Dubai One', uri: 'http://www.dubaione.ae/content/dubaione/en-ae/live.html', video_url: ''},
    //     {title: 'Youtube', uri: 'http://www.youtube.com', video_url: ''}
    // ]
    const {colors} = useTheme();
    return (
            <View style = {styles.container}>
            <SearchBar
                navigation = {navigation}
                style = {{marginHorizontal: 10}} 
            />
            <View style = {{flex: 1}}>
                <Text style = {{fontSize: 30, paddingHorizontal: 20, margin: 5, color: colors.text}}>Channels</Text>
                <Grid 
                    style = {styles.grid}
                    // renderPlaceholder={(id) => {}}
                    keyExtractor = {(item, id) => {id}}
                    numColumns = {4}
                    renderItem={(item, id) => {
                        return (
                            <View style = {styles.item} key = {id}>
                                <TouchableOpacity onPress = {() => {navigation.navigate('Browser', {uri: item.uri});}}>
                                    <Image 
                                        style = {styles.itemicon} 
                                        source = {{uri: `https://s2.googleusercontent.com/s2/favicons?domain=${item.uri}`}} 
                                    />
                                    <Text style = {{alignSelf: 'center', color: colors.text, paddingVertical: 5}}>{item.title}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                    data = {channels}
                />
            </View>
            <BottomNav navigation = {navigation} style = {styles.bottom}></BottomNav>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    grid: {
        flex: 1
    },
    item: {
        flex: 1,
        padding: 10, margin: 5, elevation: 10, borderRadius: 8
    },
    itemicon: {
        height: 20, width: 20, alignSelf: 'center'
    },
    bottom: {
        alignSelf: 'flex-end',
        marginBottom: 20
    },
});

export default NewTabView;