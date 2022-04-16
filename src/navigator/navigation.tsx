import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/HomeScreen';
import PokemonScreen from '../screens/PokemonScreen';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

export type RootStackParams = {
    Home: undefined;
    PokemonScreen: { SimplePokemon: SimplePokemon, color: string; };
}

const Stack = createStackNavigator<RootStackParams>();

const Navigation = () => {

    return(
        <>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        cardStyle: {
                            backgroundColor: 'white'
                        }
                    }}
                >
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name='PokemonScreen' component={PokemonScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default Navigation;