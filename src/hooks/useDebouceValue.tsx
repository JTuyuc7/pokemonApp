import { useState, useEffect } from 'react';

export const useDebouceValue = ( input: string = '', time: number = 500) => {

    const [ debouceValue, setDebouceValue ] = useState(input);

    useEffect(() => {

        const timeout = setTimeout(() => {
            setDebouceValue(input)
        }, time );

        return () => {
            clearTimeout(timeout);
        }
    },[input])

    return{
        debouceValue
    }
}