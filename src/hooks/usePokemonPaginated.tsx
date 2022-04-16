import { useEffect, useRef, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
    //const url = `https://pokeapi.co/api/v2/pokemon?limit=40`
    
    const [ simplePokemon, setSimplePokemon ] = useState<SimplePokemon[]>([])
    const [ isLoading, setIsloading ] = useState(true);

    const nextPage = useRef(`https://pokeapi.co/api/v2/pokemon?limit=40`);
    useEffect(() => {
        loadPokemons()
    },[]);

    const loadPokemons = async () => {
        setIsloading(true);
        const result = await pokemonApi.get<PokemonPaginatedResponse>(nextPage.current);
        nextPage.current = result.data.next;
        mapPokemonList(result.data.results);
    } 

    const mapPokemonList = ( pokemonList: Result[] ) => {
        const newPokemonLost: SimplePokemon[] = pokemonList.map( ({name, url}) => {
            const urlPats = url.split('/');
            const id = urlPats[ urlPats.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            return { name, picture, id }
        });

        setSimplePokemon([...simplePokemon, ...newPokemonLost]);
        setIsloading(false);
    }

    return {
        isLoading,
        simplePokemon,
        loadPokemons,
    }
}