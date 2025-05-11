import { useContext, useEffect, useState } from 'react';
import { PokedexDataContext } from '../../contexts/PokedexDataContext';

export const ItemView = () => {
  const { items, currentIndex, fetchItems } = useContext(PokedexDataContext);
  const [description, setDescription] = useState('');
  const currentItem = items[currentIndex];

  useEffect(() => {
    const loadItems = async () => {
      await fetchItems();
    };
    loadItems();
  }, []);

  useEffect(() => {
    if (currentItem?.flavor_text_entries) {
      const spanishDesc = currentItem.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'es'
      );
      setDescription(spanishDesc?.text || 'Descripción no disponible');
    }
  }, [currentItem]);

  if (!items || items.length === 0) {
    return <div className="font-pokemon text-xs">Cargando items...</div>;
  }

  if (!currentItem) {
    return <div className="font-pokemon text-xs">Item no encontrado</div>;
  }

  // Asegurarnos de que la URL de la imagen esté limpia (sin espacios o comillas)
  const imageUrl = currentItem.sprites.default.trim().replace(/['"]/g, '');

  return (
    <div className="font-pokemon text-xs text-center">
      <img 
        src={imageUrl}
        alt={currentItem.name}
        style={{ width: '96px', height: '96px', margin: '0 auto' }}
        onError={(e) => {
          e.currentTarget.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
        }}
      />
      <div>#{currentItem.id.toString().padStart(3, '0')}</div>
      <div>{currentItem.name.toUpperCase().replace(/-/g, ' ')}</div>
      <div className="mt-2 text-[0.5rem] leading-tight px-4">
        {description || 'Cargando descripción...'}
      </div>
    </div>
  );
};