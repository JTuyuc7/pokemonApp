import { useState, useEffect, useRef } from 'react';
import { FullPokemon } from '../interfaces/pokemonInterfaces';
import { pokemonApi } from '../api/pokemonApi';

export const usePokemon = ( id: string) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const [ pokemonResult, setPokemonResult ] = useState<FullPokemon>();
    const [ isLoading, setIsloading ] = useState(true);
    const isMounted = useRef(true);

    useEffect(() => {
        if(!isMounted.current) return;
        getPokemonInfo();

        return () => {
            isMounted.current = false;
        }
    },[]);

    const getPokemonInfo = async () => {
        const result = await pokemonApi.get<FullPokemon>(url);
        setPokemonResult(result.data)
        setIsloading(false);
    }

    return {
        isLoading,
        pokemonResult
    }
}