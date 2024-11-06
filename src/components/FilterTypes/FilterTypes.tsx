import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSelectedType } from '@/redux/typeSlice';
import { useFetchTypes } from '@/redux/pokemonApi';
import styles from './FilterTypes.module.scss';
import Loader from '../Loader';

const FilterTypes: React.FC = () => {
  const dispatch = useDispatch();
  useFetchTypes();
  const { types, status, error } = useSelector(
    (state: RootState) => state.typeReducer,
  );
  const selectedType = useSelector(
    (state: RootState) => state.typeReducer.selectedType,
  );

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedType(event.target.value));
  };

  return (
    <div className={styles.filter}>
      <label htmlFor="type-filter" className={styles.filter__label}>
        Filter by Type:
      </label>
      {status === 'loading' && <Loader isLoading={status === 'loading'} />}
      {status === 'failed' && (
        <div className={styles.filter__error}>
          Error fetching types: {error}
        </div>
      )}
      {status !== 'loading' && status !== 'failed' && (
        <select
          id="type-filter"
          className={styles.filter__select}
          value={selectedType || ''}
          onChange={handleTypeChange}
        >
          <option value="">All Types</option>
          {types.length > 0 ? (
            types.map((type) => (
              <option key={type.name} value={type.url}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </option>
            ))
          ) : (
            <option disabled>No types available</option>
          )}
        </select>
      )}
    </div>
  );
};

export default FilterTypes;
