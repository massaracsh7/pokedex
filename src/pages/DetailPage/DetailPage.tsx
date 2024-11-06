import DetailInfo from '@/components/DetailInfo';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const DetailPage: React.FC = () => {
  const params = useParams();
  const detailName = params.name ?? '';
  const data = useSelector(
    (state: RootState) => state.pokemonReducer.pokemonDetails[detailName],
  );
  return (
    <div className="container">
      <DetailInfo pokemon={data} />
    </div>
  );
};

export default DetailPage;
