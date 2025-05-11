import { useContext, useEffect, useState } from 'react';
import { PokedexDataContext } from '../../contexts/PokedexDataContext';

export const PokemonView = () => {
  const { pokemons, currentIndex, fetchPokemons } = useContext(PokedexDataContext);
  const [description, setDescription] = useState('');
  const currentPokemon = pokemons[currentIndex];

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    if (currentPokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${currentPokemon.id}`)
        .then(res => res.json())
        .then(data => {
          const spanishDesc = data.flavor_text_entries.find(
            (entry: any) => entry.language.name === 'es'
          );
          setDescription(spanishDesc?.flavor_text || 'Descripción no disponible');
        })
        .catch(() => setDescription('Error al cargar la descripción'));
    }
  }, [currentPokemon]);

  if (!currentPokemon) return <div>Cargando...</div>;

  return (
    <div className="font-pokemon text-xs">
      <img src={currentPokemon.sprites.front_default} alt={currentPokemon.name} />
      <div>#{currentPokemon.id.toString().padStart(3, '0')}</div>
      <div>{currentPokemon.name.toUpperCase()} / 
        {currentPokemon.types.map(type => (
          <span key={type.type.name}>{type.type.name.toUpperCase()} </span>
        ))}
      </div>
      <div className="mt-2 text-[0.5rem] leading-tight">
        {description}
      </div>
    </div>
  );
};