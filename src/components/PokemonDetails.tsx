import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { FullPokemon, Ability } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: FullPokemon
}

const PokemonDetails = ( {pokemon}: Props ) => {

    return(
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    ...StyleSheet.absoluteFillObject
                }}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Types</Text>
                    <View
                        style={{ flexDirection: 'row'}}
                    >
                        {
                            pokemon.types.map( ({type}) => (
                                <Text
                                    key={type.name}
                                    style={styles.regularText}
                                >{type.name}</Text>
                            ))
                        }
                    </View>
                </View>

                <View
                    style={{...styles.container, marginTop: 8}}
                >
                    <Text style={styles.title}>Sprites</Text>

                    <ScrollView
                        horizontal={true}
                    >
                        <FadeInImage 
                            uri={pokemon.sprites.front_default}
                            style={styles.basicSprite}
                        />
                        <FadeInImage 
                            uri={pokemon.sprites.back_default}
                            style={styles.basicSprite}
                        />
                        <FadeInImage 
                            uri={pokemon.sprites.front_default}
                            style={styles.basicSprite}
                        />
                        <FadeInImage 
                            uri={pokemon.sprites.front_shiny}
                            style={styles.basicSprite}
                        />
                    </ScrollView>

                </View>

                <View
                    style={{...styles.container, marginTop: 8}}
                >
                    <Text style={styles.title}>Peso</Text>
                    <Text style={styles.regularText}>{pokemon.weight} Kg</Text>
                </View>

                <View
                    style={{...styles.container}}
                >
                    <Text style={{...styles.title}}>Habilidades base</Text>
                    <View
                        style={{ flexDirection: 'row'}}
                    >
                        {
                            pokemon.abilities.map( ({ability}) => (
                                <Text
                                    key={ability.name}
                                    style={styles.regularText}
                                >{ability.name}</Text>
                            ))
                        }
                    </View>
                </View>
                <View
                    style={{...styles.container}}
                >
                    <Text style={{...styles.title}}>Movimientos</Text>
                    <View
                        style={{ flexWrap: 'wrap', flexDirection: 'row'}}
                    >
                        {
                            pokemon.moves.map( ({move}) => (
                                <Text
                                    key={move.name}
                                    style={styles.regularText}
                                >{move.name}</Text>
                            ))
                        }
                    </View>
                </View>
                <View
                    style={{...styles.container, marginBottom: 60}}
                >
                    <Text style={{...styles.title}}>Stats</Text>
                    <View
                        //style={{flexDirection: 'row'}}
                    >
                        {
                            pokemon.stats.map( (stat, idx ) => (
                                <View
                                    key={stat.stat.name + idx}
                                    style={{ flexDirection: 'row',}}
                                >
                                    <Text
                                        style={{...styles.regularText, marginRight: 10, width: 150}}
                                    >{stat.stat.name}</Text>
                                    <Text
                                        style={{...styles.regularText, fontWeight: 'bold'}}
                                    >{stat.base_stat}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 5
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5
    },
    regularText: {
        color: 'black',
        fontSize: 17,
        marginRight: 5
    },
    basicSprite:{
        height: 80,
        width: 80
    }
})

export default PokemonDetails;