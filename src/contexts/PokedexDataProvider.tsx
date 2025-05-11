import { ReactNode, useState } from 'react';
import { PokedexDataContext, Pokemon, Item } from './PokedexDataContext';

export const PokedexDataProvider = ({ children }: { children: ReactNode }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchPokemons = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      setPokemons(pokemonDetails);
      setCurrentPokemon(pokemonDetails[0]);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    }
  };

  const fetchItems = async () => {
    try {
      // Primero obtenemos la lista limitada de items
      const response = await fetch('https://pokeapi.co/api/v2/item?limit=1000');
      const data = await response.json();
      
      // Luego obtenemos los detalles de cada item
      const itemDetails = await Promise.all(
        data.results.map(async (item: { name: string, url: string }) => {
          const itemResponse = await fetch(item.url);
          const itemData = await itemResponse.json();
          return {
            id: itemData.id,
            name: itemData.name,
            sprites: {
              default: itemData.sprites.default
            },
            flavor_text_entries: itemData.flavor_text_entries || []
          };
        })
      );

      console.log('Items cargados:', itemDetails); // Para depuración
      setItems(itemDetails);
    } catch (error) {
      console.error('Error al cargar items:', error);
    }
  };

  return (
    <PokedexDataContext.Provider
      value={{
        pokemons,
        currentPokemon,
        items,
        currentItem,
        currentIndex,
        setCurrentIndex,
        fetchPokemons,
        fetchItems,
      }}
    >
      {children}
    </PokedexDataContext.Provider>
  );
};