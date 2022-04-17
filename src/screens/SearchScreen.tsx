import React, { useState, useEffect } from 'react';
import { Text, View, Platform, Dimensions, FlatList  } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PokemonCard from '../components/PokemonCard';
import SearchInput from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { globalStyles } from '../theme/appTheme';
import Loading from '../components/Loading';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const { height, width } = Dimensions.get('window');

const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isfetching, simplePokemon } = usePokemonSearch();
    const [ pokemonWorkd, setPokemonWord ] = useState('');
    const [ filteredPokemon, setFilteredPomkemon ] = useState<SimplePokemon[]>([])

    useEffect(() => {
        if(pokemonWorkd.length === 0){
            return setFilteredPomkemon([])
        }

        if( isNaN( Number(pokemonWorkd ))){
            setFilteredPomkemon(
                simplePokemon.filter( poke => poke.name.toLowerCase().includes(pokemonWorkd.toLocaleLowerCase()) )
            )
        }else {
            const pokemonById = simplePokemon.find( (poke) => poke.id === pokemonWorkd);
            setFilteredPomkemon(
                (pokemonById) ? [pokemonById] : []
            )
        }
        

    }, [pokemonWorkd])

    if(isfetching){
        return <Loading />
    }

    return(
        <>
            <View
                style={{
                    flex: 1,
                    marginTop: Platform.OS === 'ios' ? top : top + 15,
                }}
            >
                <SearchInput 
                    onDebounce={ (val) => setPokemonWord(val)}
                    stylePros={{
                        position: 'absolute',
                        zIndex: 999,
                        width: width,
                        top: Platform.OS === 'ios' ? top : top + 10
                    }}
                />

                <View
                    style={{
                        ...globalStyles.globalMargin,
                        //paddingTop: 50,
                        alignItems: 'center',
                    }}
                >
                    <FlatList 
                        data={ filteredPokemon }
                        keyExtractor={ (pokemon) => pokemon.id}
                        numColumns={2}
                        renderItem={ ({item}) => (
                            <PokemonCard 
                                pokemon={item}
                            />
                        )}

                        // Header flatlist
                        ListHeaderComponent={ () => (
                            <Text style={{ ...globalStyles.globalMargin, ...globalStyles.title,  marginTop: 80, marginBottom: top + 10 }}>{ !pokemonWorkd ? 'Pokedex' : pokemonWorkd }</Text>
                        )}
                    />

                </View>
            </View>
        </>
    )
}

export default SearchScreen;