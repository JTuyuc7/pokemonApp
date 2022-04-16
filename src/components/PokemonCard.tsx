import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import { useNavigation } from '@react-navigation/native';

interface Props {
    pokemon: SimplePokemon
};

const { width, height } = Dimensions.get('window');

const PokemonCard = ( {pokemon}: Props) => {

    const navigation = useNavigation();

    const [bgColor, setBgColor] = useState('#9f9c9c');
    const isMounted = useRef(true)

    useEffect(() => {
        ImageColors.getColors(pokemon.picture, { fallback: 'gray'})
            .then( (colors) => {
                if(!isMounted.current) return;

                if(colors.platform === 'android'){
                    setBgColor(colors.dominant || 'gray');
                }else if (colors.platform === 'ios'){
                    setBgColor(colors.background || 'gray')
                }
            }).catch((error) => {
                console.log(error);
            })

        return () => {
            isMounted.current = false;
        }
    }, [])

    return(
        <>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={ () => navigation.navigate('PokemonScreen' as never, { pokemon, color: bgColor } as never )}
            >
                <View
                    style={{...styles.cardContainer, backgroundColor: bgColor}}
                >
                    <View>
                        <Text style={styles.pokemonName}>
                            {pokemon.name}
                            { '\n#' + pokemon.id }    
                        </Text>
                    </View>

                    <View
                        style={styles.pokebolaContainer}
                    >
                        <Image 
                            source={require('../assets/pokebola-blanca.png')}
                            style={styles.pokebolaImg}
                        />
                    </View>

                    <FadeInImage 
                        uri={pokemon.picture}
                        style={styles.pokemonImg}
                    />
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({

    cardContainer: {
        //backgroundColor: bgColor,
        height: 120,
        width: width * 0.44,
        marginBottom: 25,
        borderRadius: 10,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    pokemonName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 5,
        left: 10
    },
    pokebolaImg: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -20,
        bottom: -10
    },
    pokemonImg: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -6,
        bottom: -5
    },
    pokebolaContainer: {
        //backgroundColor: 'blue',
        height: 100,
        width: 100,
        position: 'absolute',
        bottom: -20,
        right: -20,
        opacity: 0.5,
        overflow: 'hidden'
    }
})

export default PokemonCard;