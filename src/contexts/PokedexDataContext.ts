import { createContext } from 'react';

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

export interface Item {
  id: number;
  name: string;
  sprites: {
    default: string;
  };
  flavor_text_entries: {
    text: string;
    language: {
      name: string;
    };
  }[];
}

export type TPokedexDataContext = {
  pokemons: Pokemon[];
  currentPokemon: Pokemon | null;
  items: Item[];
  currentItem: Item | null;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  fetchPokemons: () => Promise<void>;
  fetchItems: () => Promise<void>;
};

export const PokedexDataContext = createContext<TPokedexDataContext>({
  pokemons: [],
  currentPokemon: null,
  items: [],
  currentItem: null,
  currentIndex: 0,
  setCurrentIndex: () => {},
  fetchPokemons: async () => {},
  fetchItems: async () => {},
});