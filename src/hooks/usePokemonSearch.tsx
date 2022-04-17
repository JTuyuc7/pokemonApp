import { useEffect, useRef, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {
    //const url = `https://pokeapi.co/api/v2/pokemon?limit=40`
    
    const [ simplePokemon, setSimplePokemon ] = useState<SimplePokemon[]>([])
    const [ isfetching, setIsFething ] = useState(true);
    const url = `https://pokeapi.co/api/v2/pokemon?limit=1200`;

    useEffect(() => {
        loadPokemons()
    },[]);

    const loadPokemons = async () => {
        const result = await pokemonApi.get<PokemonPaginatedResponse>(url);
        mapPokemonList(result.data.results);
    } 

    const mapPokemonList = ( pokemonList: Result[] ) => {
        const newPokemonList: SimplePokemon[] = pokemonList.map( ({name, url}) => {
            const urlPats = url.split('/');
            const id = urlPats[ urlPats.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            return { name, picture, id }
        });

        setSimplePokemon([ ...newPokemonList]);
        setIsFething(false);
    }

    return {
        isfetching,
        simplePokemon,
    }
}