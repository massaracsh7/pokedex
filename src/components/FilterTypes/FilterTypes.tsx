import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSelectedType } from '@/redux/typeSlice';

const FilterTypes: React.FC = () => {
  const dispatch = useDispatch();
  const types = useSelector((state: RootState) => state.typeReducer.types);
  const selectedType = useSelector(
    (state: RootState) => state.typeReducer.selectedType,
  );

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedType(event.target.value));
  };

  return (
    <div>
      <label htmlFor="type-filter">Filter by Type:</label>
      <select
        id="type-filter"
        value={selectedType || ''}
        onChange={handleTypeChange}
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.name} value={type.url}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterTypes;
