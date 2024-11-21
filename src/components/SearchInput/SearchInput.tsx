import { setSearch } from '@/redux/pokemonSlice';
import { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './SearchInput.module.scss';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { IconButton } from '@/components/Buttons';
import { debounce } from 'lodash';

const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const debouncedSearch = debounce((value: string) => {
    if (value.trim().length >= 4 || value.trim() === '') {
      dispatch(setSearch(value.trim()));
    }
  }, 1000);

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchText(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  const clearSearch = () => {
    setSearchText('');
    dispatch(setSearch(''));
    debouncedSearch.cancel();
  };

  const submitSearch = () => {
    debouncedSearch(searchText);
  };

  return (
    <div className={styles.search}>
      <input
        type="search"
        onChange={handleSearch}
        value={searchText}
        placeholder="Enter name"
        className={styles.search__input}
      />
      <IconButton icon={FaSearch} label="Search" onClick={submitSearch} />
      <IconButton icon={FaTimes} label="Clear" onClick={clearSearch} />
    </div>
  );
};

export default SearchInput;
