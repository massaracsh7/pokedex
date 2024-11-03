import { useEffect } from 'react';
import { useFetchById } from '@/redux/pokemonApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface CardItemProps {
  pokemon: { name: string; url: string };
}

const CardItem = ({ pokemon }: CardItemProps) => {
  const dispatch = useDispatch();
  const cachedPokemon = useSelector((state: RootState) => state.storeReducer.pokemonDetails[pokemon.name]);
  const loading = useSelector((state: RootState) => state.storeReducer.loading); // Получаем состояние загрузки из Redux
  const error = useSelector((state: RootState) => state.storeReducer.error); // Если у вас есть ошибка в состоянии

  // Используем хук для получения данных по ID покемона
  const { data, isLoading, isError } = useFetchById(pokemon.url, {
    skip: !!cachedPokemon, // Пропускаем запрос, если данные уже кэшированы
  });

  // Объединяем данные из кэша и полученные данные
  const pokemonData = cachedPokemon || data;

  // Обработка состояния загрузки и ошибки
  if (loading || isLoading) return <p>Loading...</p>;
  if (error || isError) return <p>Error loading Pokémon data.</p>; // Отображаем сообщение об ошибке

  return (
    <div className="card-item">
      <h2>{pokemonData?.name}</h2>
      <img src={pokemonData?.sprites.front_default} loading="lazy" alt={pokemonData?.name} />
      <p>Type: {pokemonData?.types.map(type => type.type.name).join(', ')}</p>
    </div>
  );
};

export default CardItem;
