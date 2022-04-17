import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navigation, { RootStackParams } from './navigation';
import SearchScreen from '../screens/SearchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

import PokemonScreen from '../screens/PokemonScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {


    const StackSearch = createStackNavigator<RootStackParams>();

    const NavigationSearch = () => {

        return(
            <>
                <StackSearch.Navigator
                    screenOptions={{
                        headerShown: false,
                        cardStyle: {
                            backgroundColor: 'white'
                        }
                    }}
                >
                    <StackSearch.Screen name="Home" component={SearchScreen} />
                    <StackSearch.Screen name='PokemonScreen' component={PokemonScreen} />
                </StackSearch.Navigator>
            </>
        )
    }

    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    opacity: 0.5,
                    position: 'absolute',
                },
                tabBarActiveTintColor: '#5856d6',
                tabBarInactiveTintColor: 'black',
                tabBarLabelStyle: {
                    fontSize: 15,
                    marginBottom: 5,
                    fontWeight: 'bold',
                    elevation: 0,
                },
                
            }}
            sceneContainerStyle={{
                backgroundColor: 'white',
            }}
        >
            <Tab.Screen 
                name='HomeScreen' 
                component={Navigation}
                options={{
                    tabBarLabel: 'Listado',
                    tabBarIcon: ({ color }) => <Icon name="list-outline" color={color} size={20} />,
                    tabBarStyle: {
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        height: 55,
                        position: 'absolute',
                        opacity: 0.7
                    }
                }}
            />
            <Tab.Screen 
                name='Search' 
                component={NavigationSearch} 
                options={{
                    tabBarLabel: 'Busqueda',
                    tabBarIcon: ({ color }) => <Icon name="search" color={color} size={20} />,
                    tabBarStyle: {
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        //backgroundColor: 'red',
                        height: 65,
                        position: 'absolute',
                        opacity: 0.7
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigation;