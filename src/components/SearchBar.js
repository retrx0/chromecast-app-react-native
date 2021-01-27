import React, {useState, useContext} from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
// import Context from '../context/SearchUriContext'

const SearchBar = ({navigation}) => {
    // const SearchContext = React.createContext('https://google.com');
    console.log(navigation)
    // const {sendUri} = useContext(Context);
    const [address, setAddress] = useState('');
    return (
        <View style = {styles.searchBarArea}>
            <TextInput 
                placeholder = 'Type url'
                style = {styles.searchInput}
                clearButtonMode = 'while-editing'
                keyboardType = 'url'
                returnKeyType = 'go'
                autoCapitalize = 'none'
                autoCorrect = {false}
                value = {address}
                onChangeText = {setAddress}
                onFocus = {() => setAddress('http://www.')}
                onSubmitEditing = {() => navigation.navigate('Browser', address)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBarArea: {
        backgroundColor:'#fff',
        // backgroundColor:'#f0eeee',
        height: 45,
        padding: 5,
        flexDirection: 'row'
    },
    searchTitle: {
        fontSize: 25,
        marginLeft: 10
    },
    searchSubTitle: {
        fontSize: 15
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        borderColor: '#111111',
        borderWidth: 0.3,
        borderRadius: 5,
        height: 35,
        paddingLeft: 5
    },

});

export default SearchBar;