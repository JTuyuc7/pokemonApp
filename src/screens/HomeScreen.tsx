import React from 'react';
import { Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../theme/appTheme';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import PokemonCard from '../components/PokemonCard';

const Home = () => {

    const { top } = useSafeAreaInsets();
    const { isLoading, simplePokemon, loadPokemons } = usePokemonPaginated();

    return(
        <>

            <Image 
                source={ require('../assets/pokebola.png')}
                style={globalStyles.bgPokebola}
            />

            <View
                style={{
                    ...globalStyles.globalMargin,
                    alignItems: 'center',
                    //justifyContent: 'center'
                }}
            >
                <FlatList 
                    data={ simplePokemon }
                    keyExtractor={ (pokemon) => pokemon.id}
                    numColumns={2}
                    renderItem={ ({item}) => (
                        <PokemonCard 
                            pokemon={item}
                        />
                    )}

                    // Header flatlist
                    ListHeaderComponent={ () => (
                        <Text style={{ ...globalStyles.globalMargin, ...globalStyles.title,  marginTop: top, marginBottom: top + 10 }}>Pokedex</Text>
                    )}
                    // Cargar mas pokemones
                    onEndReached={loadPokemons}
                    onEndReachedThreshold={0.4}

                    // Mostrar un spiner al final para cargar mas
                    ListFooterComponent={ () => (
                        <View style={{ height: 100, justifyContent: 'center', alignItems: 'center', marginBottom: 30}}>
                            <ActivityIndicator size={35} color="black" />
                        </View>
                    )}
                />

            </View>
        </>
    )
}

export default Home;