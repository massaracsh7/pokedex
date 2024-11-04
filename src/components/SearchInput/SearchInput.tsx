import { setSearch } from '@/redux/pokemonSlice';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    dispatch(setSearch(value));
  };

  const clearSearch = () => {
    setSearchText('');
    dispatch(setSearch(''));
  };

  return (
    <>
      <div>Search:</div>
      <input
        type="search"
        onChange={handleSearch}
        value={searchText}
        placeholder="Enter name"
      />
      <button onClick={() => dispatch(setSearch(searchText))}>Search</button>
      <button onClick={clearSearch}>Clear</button>
    </>
  );
};

export default SearchInput;
