import { useContext } from "react";
import { EPokedexScreen, MenuPokedexContext } from "../../contexts/MenuPokedexContext";
import { PokedexDataContext } from "../../contexts/PokedexDataContext";

export const Cross = () => {
  const { screen, menuOption, setMenuOption } = useContext(MenuPokedexContext);
  const { pokemons, items, currentIndex, setCurrentIndex } = useContext(PokedexDataContext);

  const handleNavigation = (direction: 'up' | 'down') => {
    if (screen === EPokedexScreen.MENU) {
      const newOption = direction === 'up' 
        ? menuOption - 1 < 1 ? 3 : menuOption - 1
        : menuOption + 1 > 3 ? 1 : menuOption + 1;
      setMenuOption(newOption);
    } else if (screen === EPokedexScreen.POKEDEX) {
      const maxIndex = pokemons.length - 1;
      const newIndex = direction === 'up'
        ? currentIndex - 1 < 0 ? maxIndex : currentIndex - 1
        : currentIndex + 1 > maxIndex ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    } else if (screen === EPokedexScreen.PACK) {
      const maxIndex = items.length - 1;
      const newIndex = direction === 'up'
        ? currentIndex - 1 < 0 ? maxIndex : currentIndex - 1
        : currentIndex + 1 > maxIndex ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div id="cross">
      <div id="leftcross" className="gameboy-button">
        <div id="leftT"></div>
      </div>
      <div
        id="topcross"
        className="gameboy-button"
        onClick={() => handleNavigation('up')}
      >
        <div id="upT"></div>
      </div>
      <div id="rightcross" className="gameboy-button">
        <div id="rightT"></div>
      </div>
      <div id="midcross" className="gameboy-button">
        <div id="midCircle"></div>
      </div>
      <div
        id="botcross"
        className="gameboy-button"
        onClick={() => handleNavigation('down')}
      >
        <div id="downT"></div>
      </div>
    </div>
  );
};