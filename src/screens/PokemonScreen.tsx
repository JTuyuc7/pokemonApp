import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import { RootStackParams } from '../navigator/navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import PokemonDetails from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'>{};

const { width, height } = Dimensions.get('window');

const PokemonScreen = ( {navigation, route }: Props ) => {

    const { top } = useSafeAreaInsets();

    const { pokemon, color } = route.params as any;

    const { isLoading, pokemonResult } = usePokemon(pokemon.id);

    return(
        <>
            <View>
                <View style={{
                    ...styles.bgImage ,
                    backgroundColor: color,
                    
                }}
            >
                    
                </View>
                    <View
                        style={{...styles.backButton, marginTop: top + 10}}
                    >
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={{ zIndex: 999}}
                            onPress={ () => navigation.goBack()}
                        >
                            <Icon name='arrow-back-outline' size={50} color="white" />
                        </TouchableOpacity>

                        <Text
                            style={styles.textName}
                        >{pokemon.name + '\n'} # {pokemon.id}</Text>

                        <Image 
                            source={require('../assets/pokebola-blanca.png')}
                            style={styles.pokebolaImg}
                        />

                        <FadeInImage 
                            uri={pokemon.picture}
                            style={styles.pokemonImgB}
                        />
                    </View>
                <View
                    style={{...styles.loadingContainer}}
                >
                    {
                        isLoading ? (
                            <ActivityIndicator size={45} color={color} />
                        ) : (
                            <PokemonDetails pokemon={pokemonResult!} />
                        )
                    }
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    bgImage: {
        height: 320,
        zIndex: 998,
        borderBottomEndRadius: 185,
        borderBottomStartRadius: 185,
        alignItems: 'center'
    },
    backButton: {
        //backgroundColor: 'green',
        position: 'absolute',
        //top: 30,
        left: 20,
        zIndex: 999
    },
    textName: {
        fontSize: 22,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'white',
        zIndex: 998
    },
    pokebolaImg: {
        height: height * 0.30,
        width: width * 0.55,
        //alignSelf: 'center',
        position: 'absolute',
        alignItems: 'center',
        left: width * 0.18,
        top: height * 0.1,
        opacity: 0.6
    },
    pokemonImgB: {
        height: 250,
        width: 250,
        position: 'absolute',
        left: 45,
        top: 43
    },
    loadingContainer: {
        //backgroundColor: 'green',
        height: height * 0.55,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default PokemonScreen;