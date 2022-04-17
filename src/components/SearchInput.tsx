import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouceValue } from '../hooks/useDebouceValue';

interface Props {
    stylePros?: StyleProp<ViewStyle>;
    onDebounce: (val:string) => void;
}

const SearchInput = ({stylePros, onDebounce}: Props) => {

    const [ search, setSearch ] = useState('');

    const { debouceValue } = useDebouceValue(search, 500)
    
    useEffect(() => {
        onDebounce(debouceValue)
    },[debouceValue])

    return(
        <>
            <View
                style={{...styles.container, ...stylePros as any}}
            >
                <View
                    style={styles.bgContainer}
                >
                    <TextInput 
                        placeholder='Find a pokemon'
                        placeholderTextColor="#617372"
                        style={styles.textInput}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="off"
                        onChangeText={(e) => setSearch(e)}
                        value={search}
                    />

                    <Icon name='search-outline' color="#617372" size={30} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'red'
    },
    bgContainer: {
        backgroundColor: "#f3f1f3",
        borderRadius: 35,
        height: 50,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        color: 'black'
    },
})

export default SearchInput;